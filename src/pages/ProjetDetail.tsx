import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  FolderKanban,
  Calendar,
  GraduationCap,
  Tag,
  Users,
  UserCheck,
  FileText,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  XCircle,
  LayoutDashboard,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";


const etatConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  valide: { label: "Validé", color: "bg-emerald-500", icon: <CheckCircle className="w-3 h-3 mr-1" /> },
  attente: { label: "En attente", color: "bg-amber-400", icon: <Clock className="w-3 h-3 mr-1" /> },
  refusé: { label: "Refusé", color: "bg-red-500", icon: <XCircle className="w-3 h-3 mr-1" /> },
};

function EtatBadge({ etat }: { etat?: string }) {
  const key = (etat ?? "").toLowerCase().replace("é", "e");
  const cfg = etatConfig[key] ?? { label: etat ?? "Inconnu", color: "bg-slate-400", icon: null };
  return (
    <Badge className={`${cfg.color} text-white flex items-center`}>
      {cfg.icon}
      {cfg.label}
    </Badge>
  );
}

const ProjetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.fetch<any>(`/projets/${id}`);
        if (!data || data.message === "Project not found.") {
          setNotFound(true);
          return;
        }
        setProject(data);

        try {
          const reportsData = await api.fetch<any[]>(`/rapports/projet/${id}`);
          setReports(Array.isArray(reportsData) ? reportsData : []);
        } catch {
          setReports([]);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <FolderKanban className="w-16 h-16 text-muted-foreground opacity-30" />
        <h2 className="text-2xl font-bold">Projet introuvable</h2>
        <p className="text-muted-foreground">Ce projet n'existe pas ou a été supprimé.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
      </div>
    );
  }

  const nomEtudiant = project.nom_etudiant || "Étudiant inconnu";
  const nomEncadrant = project.nom_encadrant || "Non assigné";
  const etatKey = (project.etat ?? "").toLowerCase();

  return (
    <div className="min-h-screen pb-16 animate-fade-in">

      {/* ─── Hero Header ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white py-14">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">

          {/* Back links */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1 text-indigo-100 hover:text-white transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1 text-indigo-100 hover:text-white transition-colors text-sm"
              >
                <LayoutDashboard className="w-4 h-4" /> Mon Espace
              </Link>
            )}
            <Link
              to="/bibliotheque/projets"
              className="inline-flex items-center gap-1 text-indigo-100 hover:text-white transition-colors text-sm"
            >
              <FileText className="w-4 h-4" /> Bibliothèque
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start gap-8">

            {/* Left — Title & meta */}
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {project.filiere}
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  {project.annee}
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm">
                  {project.visibilite === "public"
                    ? <><Eye className="w-3 h-3 mr-1" /> Public</>
                    : <><EyeOff className="w-3 h-3 mr-1" /> Privé</>}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {project.titre}
              </h1>

              {/* Student & supervisor */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-200" />
                  <div>
                    <p className="text-indigo-200 text-xs uppercase tracking-wide">Étudiant</p>
                    <p className="font-semibold">{nomEtudiant}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-200" />
                  <div>
                    <p className="text-indigo-200 text-xs uppercase tracking-wide">Encadrant</p>
                    <p className="font-semibold">{nomEncadrant}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Quick info card */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white lg:w-72 shrink-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-indigo-100">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200">Statut</span>
                  <EtatBadge etat={project.etat} />
                </div>
                <Separator className="bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200">Filière</span>
                  <span className="font-medium">{project.filiere}</span>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200">Année</span>
                  <span className="font-medium">{project.annee}</span>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200">Rapports</span>
                  <span className="font-medium">{reports.length} disponible(s)</span>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left — Description & Members */}
            <div className="lg:col-span-2 space-y-6">

              {/* Description */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FolderKanban className="w-5 h-5 text-primary" />
                    Description du projet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {project.description || "Aucune description fournie."}
                  </p>
                </CardContent>
              </Card>

              {/* Team Card */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-primary" />
                    Equipe du projet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Etudiant */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-white dark:from-slate-800 dark:to-slate-900 border">
                    <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 font-bold text-lg shrink-0">
                      {nomEtudiant.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{nomEtudiant}</p>
                      <p className="text-sm text-muted-foreground">Étudiant(e) — {project.filiere}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto text-xs">Etudiant</Badge>
                  </div>

                  {/* Encadrant */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 border">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-lg shrink-0">
                      {nomEncadrant !== "Non assigné" ? nomEncadrant.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div>
                      <p className="font-semibold">{nomEncadrant}</p>
                      <p className="text-sm text-muted-foreground">Encadrant(e)</p>
                    </div>
                    <Badge variant="outline" className="ml-auto text-xs">Encadrant</Badge>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Right Sidebar — Reports & Meta */}
            <div className="space-y-6">

              {/* Metadata summary */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Tag className="w-4 h-4 text-primary" />
                    Détails
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Statut</span>
                    <EtatBadge etat={project.etat} />
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Filière</span>
                    <span className="font-medium">{project.filiere}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Année</span>
                    <span className="font-medium">{project.annee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Visibilité</span>
                    <span className="font-medium capitalize">{project.visibilite}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Reports */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="w-4 h-4 text-primary" />
                    Rapports
                  </CardTitle>
                  <CardDescription>Documents validés</CardDescription>
                </CardHeader>
                <CardContent>
                  {reports.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">Aucun rapport disponible.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {reports.map((rapport) => (
                        <div
                          key={rapport.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                        >
                          <div>
                            <p className="font-medium text-sm">{rapport.titre}</p>
                            <p className="text-xs text-muted-foreground">
                              {rapport.type} • {new Date(rapport.date_depot).toLocaleDateString("fr-FR")}
                            </p>
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

export default ProjetDetail;
