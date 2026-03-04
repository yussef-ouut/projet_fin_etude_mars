import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Briefcase,
  Calendar,
  MapPin,
  Building,
  Globe,
  FileText,
  Download,
  CheckCircle,
  Clock,
  User
} from "lucide-react";
import { api } from "@/lib/api";

const StageDetail = () => {
  const { id } = useParams();
  const [stage, setStage] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Stage items
        const stageData = await api.fetch<any>(`/stages/${id}`);
        setStage(stageData);

        // Fetch Reports for this stage
        try {
          const reportsData = await api.fetch<any[]>(`/rapports/stage/${id}`);
          setReports(reportsData);
        } catch (err) {
          console.log("No reports or error fetching reports", err);
          setReports([]);
        }

      } catch (err) {
        console.error("Failed to fetch stage data", err);
        setError("Impossible de charger les détails du stage.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (error || !stage) return <div className="text-center py-20 text-red-500">{error || "Stage non trouvé."}</div>;

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <section className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <Link to="/bibliotheque/stages" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" />
            Retour aux stages
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="badge-warning">
                  <Globe className="w-3 h-3 mr-1" />
                  Stage
                </Badge>
                <Badge variant="outline" className="badge-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {stage.visibilite}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <Building className="w-8 h-8 text-accent" />
                {stage.entreprise}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">{stage.ville}</p>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {stage.ville}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {stage.annee}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {stage.duree}
                </span>
              </div>
            </div>

            {/* Quick Info Card */}
            <Card className="glass lg:w-80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Année</p>
                    <p className="font-medium">{stage.annee}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Durée</p>
                    <p className="font-medium">{stage.duree}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-accent" />
                    Description du stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {stage.description || "Aucune description fournie pour ce stage."}
                  </p>
                </CardContent>
              </Card>

              {/* Stagiaire Info (Placeholder as user details might not be in stage table directly without join) */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Stagiaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">ID Étudiant: {stage.id_etudiant}</p>
                  {/* In a real app, we would fetch student name here or Join in backend */}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Reports */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Rapports publics
                  </CardTitle>
                  <CardDescription>Documents validés</CardDescription>
                </CardHeader>
                <CardContent>
                  {reports.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun rapport disponible.</p>
                  ) : (
                    <div className="space-y-3">
                      {reports.map((rapport) => (
                        <div key={rapport.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                          <div>
                            <p className="font-medium text-sm">{rapport.titre}</p>
                            <p className="text-xs text-muted-foreground">{rapport.type} • {new Date(rapport.date_depot).toLocaleDateString()}</p>
                          </div>
                          <Button size="icon" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StageDetail;
