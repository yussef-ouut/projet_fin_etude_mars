import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    FileText,
    Search,
    Download,
    Eye,
    Filter,
    Calendar,
    GraduationCap
} from "lucide-react";
import { api } from "@/lib/api";

const Rapports = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.fetch<any[]>('/projets');
                // Filter only validated projects for reports
                setProjects(data.filter((p: any) => p.etat === 'validé' || p.visibilite === 'public'));
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter((project) =>
        project.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen">
            <section className="hero-gradient py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <FileText className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">Rapports de PFE</h1>
                            <p className="text-muted-foreground">Consultez et téléchargez les mémoires validés.</p>
                        </div>
                    </div>

                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Rechercher un rapport..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 py-5 glass border-border/50"
                        />
                    </div>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <p className="text-center text-muted-foreground">Chargement...</p>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                            <p className="text-muted-foreground">Aucun rapport trouvé.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, index) => (
                                <Card key={project.id} className="glass card-hover animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                                                <GraduationCap className="w-3 h-3 mr-1" />
                                                {project.filiere}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {project.annee}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg leading-tight line-clamp-2">
                                            {project.titre}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 mt-2 text-xs">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-secondary/50 rounded-lg p-3 mb-4 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm text-red-500 reduce-on-dark:bg-slate-800">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-sm font-medium truncate">Rapport_PFE_{project.annee}.pdf</p>
                                                <p className="text-xs text-muted-foreground">2.4 MB • PDF</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link to={`/projet/${project.id}`} className="flex-1">
                                                <Button variant="outline" className="w-full gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    Aperçu
                                                </Button>
                                            </Link>
                                            <Button className="flex-1 gap-2">
                                                <Download className="w-4 h-4" />
                                                Télécharger
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Rapports;
