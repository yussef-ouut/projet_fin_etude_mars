import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FolderKanban,
  Filter,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  GraduationCap,
  Tag,
  Percent
} from "lucide-react";
import { SPECIALITES } from "@/lib/constants";
import { api } from "@/lib/api";

// const filieres = ["Tous", ...SPECIALITES_LIST];
const annees = ["Toutes", "2024", "2023", "2022", "2021"];
const themes = ["Tous", "E-learning", "Gestion", "IA", "E-commerce", "IoT", "Santé"];
const technologies = ["Toutes", "React", "Python", "Flutter", "Node.js", "TensorFlow"];

const BibliotequeProjets = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState("Tous");
  const [selectedAnnee, setSelectedAnnee] = useState("Toutes");
  const [selectedTheme, setSelectedTheme] = useState("Tous");
  const [selectedTech, setSelectedTech] = useState("Toutes");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.fetch<any[]>('/projets');
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = (Array.isArray(projects) ? projects : []).filter((project) => {
    const matchesSearch = project.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFiliere = selectedFiliere === "Tous" || project.filiere === selectedFiliere;
    const matchesAnnee = selectedAnnee === "Toutes" || project.annee.toString() === selectedAnnee;
    const matchesTech = selectedTech === "Toutes" || (project.description && project.description.toLowerCase().includes(selectedTech.toLowerCase()));

    // Theme filter - approximate via description or title
    const matchesTheme = selectedTheme === "Tous" ||
      (project.titre.toLowerCase().includes(selectedTheme.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(selectedTheme.toLowerCase())));

    return matchesSearch && matchesFiliere && matchesAnnee && matchesTech && matchesTheme;
  });

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="hero-gradient py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/bibliotheque" className="hover:text-primary transition-colors">BTS Marrakech M6</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Projets</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FolderKanban className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Projets de Fin d'Études</h1>
              <p className="text-muted-foreground">{filteredProjects.length} projets disponibles</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-5 glass border-border/50"
            />
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

            <Select value={selectedFiliere} onValueChange={setSelectedFiliere}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filière" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tous">Toutes</SelectItem>
                {SPECIALITES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

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

            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Thème" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTech} onValueChange={setSelectedTech}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Technologie" />
              </SelectTrigger>
              <SelectContent>
                {technologies.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-slate-50/50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
              <p className="text-center text-muted-foreground">Chargement des projets...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card className="p-12 text-center max-w-2xl mx-auto border-dashed border-2 bg-white">
              <FolderKanban className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Aucun projet trouvé</h3>
              <p className="text-muted-foreground text-sm">Essayez de modifier vos filtres ou votre recherche.</p>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => {
                  // Extract technologies from description
                  const techMatch = project.description?.match(/Technologies:\s*(.*)/i);
                  const projectTechs = techMatch ? techMatch[1].split(',').map((t: string) => t.trim()) : [];

                  // Specialty label mapping
                  const specialtyInfo = SPECIALITES.find(s => s.value === project.filiere);
                  const specialtyLabel = specialtyInfo?.label || project.filiere;

                  return (
                    <Link key={project.id} to={`/projet/${project.id}`} className="block h-full group">
                      <Card
                        className="h-full flex flex-col overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-2xl relative p-6"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Top Row: Specialty Badge & Percentage */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold uppercase tracking-tight">{specialtyLabel}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground/60">
                            <span className="text-[10px] font-medium">%</span>
                            <span className="text-[11px] font-bold">100%</span>
                          </div>
                        </div>

                        {/* Title - Professional and Clear */}
                        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                          {project.titre}
                        </h3>

                        {/* Metadata Row: Year & Theme (Image Reference Style) */}
                        <div className="flex items-center gap-4 mb-5 text-sm text-muted-foreground/80">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 opacity-60" />
                            <span>{project.annee}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-4 h-4 opacity-60" />
                            <span>{project.filiere === 'DWFS' ? 'E-learning' : 'Gestion'}</span>
                          </div>
                        </div>

                        {/* Description (Professional Leading) */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1 opacity-90">
                          {project.description?.split('Technologies:')[0]}
                        </p>

                        {/* Technology Chips - Individual Hover Effect */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {projectTechs.slice(0, 4).map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-600 transition-all duration-300 
                                cursor-default hover:bg-blue-600 hover:text-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action - Centered View Details */}
                        <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-50 text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                          <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                          <span>Voir détails</span>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination UI - To match image reference (< 1 2 3 >) */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg opacity-40 cursor-not-allowed border-slate-200">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Link to="#">
                  <Button className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-sm">1</Button>
                </Link>
                <Link to="#">
                  <Button variant="ghost" className="w-9 h-9 rounded-lg text-sm font-medium hover:bg-slate-100">2</Button>
                </Link>
                <Link to="#">
                  <Button variant="ghost" className="w-9 h-9 rounded-lg text-sm font-medium hover:bg-slate-100">3</Button>
                </Link>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-slate-200">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BibliotequeProjets;
