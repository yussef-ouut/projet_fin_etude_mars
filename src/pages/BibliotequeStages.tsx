import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  Filter,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  MapPin,
  Building,
  Globe
} from "lucide-react";
import { api } from "@/lib/api";

import { SPECIALITES, SPECIALITES_LIST } from "@/lib/constants";

const annees = ["Toutes", "2024", "2023", "2022", "2021"];
const villes = ["Toutes", "Casablanca", "Rabat", "Fès", "Marrakech", "Tanger", "Agadir"];
const regions = ["Toutes", "Casablanca-Settat", "Rabat-Salé-Kénitra", "Fès-Meknès", "Marrakech-Safi"];
const domaines = ["Tous", ...SPECIALITES_LIST];

const BibliotequeStages = () => {
  const [stages, setStages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnnee, setSelectedAnnee] = useState("Toutes");
  const [selectedVille, setSelectedVille] = useState("Toutes");
  const [selectedDomaine, setSelectedDomaine] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const data = await api.fetch<any[]>('/stages');
        setStages(data);
      } catch (error) {
        console.error("Failed to fetch stages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStages();
  }, []);

  const filteredStages = (Array.isArray(stages) ? stages : []).filter((stage) => {
    const matchesSearch = stage.entreprise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stage.description && stage.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAnnee = selectedAnnee === "Toutes" || stage.annee.toString() === selectedAnnee;
    const matchesVille = selectedVille === "Toutes" || stage.ville === selectedVille;

    // Domain filtering - check if stage.domaine matches or if it's in description/theme
    const stageDomaine = stage.domaine || stage.theme || "";
    const matchesDomaine = selectedDomaine === "Tous" || stageDomaine === selectedDomaine || (stage.description && stage.description.includes(selectedDomaine));

    return matchesSearch && matchesAnnee && matchesVille && matchesDomaine;
  });

  // Get unique cities for location chips from actual data
  const uniqueCities = [...new Set((Array.isArray(stages) ? stages : []).map(s => s.ville))];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/bibliotheque" className="hover:text-primary transition-colors">BTS Marrakech M6</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Stages</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Stages en Entreprise</h1>
              <p className="text-muted-foreground">{filteredStages.length} stages disponibles</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une entreprise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-5 glass border-border/50"
            />
          </div>

          {/* Location Chips */}
          <div className="flex items-center gap-2 mt-6 flex-wrap">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Villes:</span>
            {uniqueCities.slice(0, 8).map((city: any) => (
              <button
                key={city}
                onClick={() => setSelectedVille(selectedVille === city ? "Toutes" : city)}
                className={`filter-chip ${selectedVille === city ? "filter-chip-active" : ""}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 border-b border-border bg-background/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filtres:
            </div>

            <Select value={selectedAnnee} onValueChange={setSelectedAnnee}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                {annees.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDomaine} onValueChange={setSelectedDomaine}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Spécialité" />
              </SelectTrigger>
              <SelectContent>
                {domaines.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedVille} onValueChange={setSelectedVille}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Toutes">Toutes</SelectItem>
                {uniqueCities.map((c: any) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="ml-auto flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récents</SelectItem>
                  <SelectItem value="old">Plus anciens</SelectItem>
                  <SelectItem value="entreprise">Entreprise A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Chargement des stages...</p>
          ) : filteredStages.length === 0 ? (
            <Card className="glass p-12 text-center">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun stage trouvé</h3>
              <p className="text-muted-foreground">Essayez de modifier vos filtres ou votre recherche.</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStages.map((stage, index) => (
                <Link key={stage.id} to={`/stage/${stage.id}`}>
                  <Card className="glass card-hover h-full flex flex-col animate-fade-in group border-border/50 hover:border-accent/50 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-4">
                        {/* Domaine Badge - Beige style as per request/image */}
                        <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-orange-600/80" />
                          <Badge variant="secondary" className="bg-[#FFF8F0] text-orange-800 hover:bg-[#FFF8F0] border-orange-100 font-medium text-xs">
                            {stage.domaine || stage.theme || "Stage PFE"}
                          </Badge>
                        </div>

                        <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full">
                          {stage.duree || "6 mois"}
                        </span>
                      </div>

                      <div className="flex items-start gap-4 mt-2">
                        <div className="w-10 h-10 rounded-lg bg-white border border-border  flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <Building className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold leading-tight mb-1 group-hover:text-accent transition-colors">
                            {stage.entreprise}
                          </CardTitle>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {stage.ville}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {stage.annee}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col pt-2">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {stage.description?.split('Technologies:')[0] || "Aucune description disponible."}
                        </p>
                      </div>

                      <div className="mt-auto space-y-4">
                        {/* Tech Chips Handling */}
                        {(() => {
                          const techMatch = stage.description?.match(/Technologies:\s*(.*)/i);
                          const stageTechs = techMatch ? techMatch[1].split(',').map((t: string) => t.trim()) : [];

                          return stageTechs.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {stageTechs.slice(0, 3).map((tech: string) => (
                                <span key={tech} className="px-2 py-1 rounded-md bg-secondary text-[10px] font-medium text-secondary-foreground border border-border/50">
                                  {tech}
                                </span>
                              ))}
                              {stageTechs.length > 3 && (
                                <span className="px-2 py-1 rounded-md bg-secondary text-[10px] font-medium text-muted-foreground">
                                  +{stageTechs.length - 3}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="secondary" className="text-[10px] h-6 font-normal bg-accent/5 text-accent-foreground border-accent/10">
                                Stage PFE
                              </Badge>
                              <Badge variant="secondary" className="text-[10px] h-6 font-normal">
                                Temps plein
                              </Badge>
                            </div>
                          );
                        })()}

                        <Button className="w-full justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">Afficher détails</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BibliotequeStages;
