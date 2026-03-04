import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { StageForm } from "@/components/forms/StageForm";
import { SuiviForm } from "@/components/forms/SuiviForm";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Briefcase, Activity, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [myProjects, setMyProjects] = useState<any[]>([]);
    const [myStages, setMyStages] = useState<any[]>([]);
    const [mySuivis, setMySuivis] = useState<any[]>([]);
    const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
    const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMyData = () => {
        setIsLoading(true);
        Promise.all([
            api.fetch<any>('/projets/mine')
                .then(data => setMyProjects(Array.isArray(data) ? data : []))
                .catch(() => setMyProjects([])),
            api.fetch<any>('/stages/mine')
                .then(data => setMyStages(Array.isArray(data) ? data : []))
                .catch(() => setMyStages([])),
            api.fetch<any>('/suivi')
                .then(data => setMySuivis(Array.isArray(data) ? data : []))
                .catch(() => setMySuivis([]))
        ]).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }
        fetchMyData();
    }, [isAuthenticated, navigate]);

    if (!user || isLoading) {
        return (
            <div className="container py-8 flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Chargement de votre espace...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8 space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-8 md:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2">Bonjour, {user.nom} 👋</h1>
                    <p className="text-indigo-100 text-lg max-w-xl">
                        Bienvenue sur votre espace personnel. Gérez vos projets, trouvez des stages et suivez votre avancement académique en toute simplicité.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Button onClick={logout} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm">
                            Déconnexion
                        </Button>
                    </div>
                </div>
            </div>

            {user.role === 'etudiant' && (
                <Tabs defaultValue="projects" className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <TabsList className="bg-background border p-1 rounded-xl h-12">
                            <TabsTrigger value="projects" className="px-6 gap-2"><BookOpen className="w-4 h-4" /> Mes Projets</TabsTrigger>
                            <TabsTrigger value="stages" className="px-6 gap-2"><Briefcase className="w-4 h-4" /> Mes Stages</TabsTrigger>
                            <TabsTrigger value="suivi" className="px-6 gap-2"><Activity className="w-4 h-4" /> Suivi</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="projects" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Summary Card */}
                            <Card className="md:col-span-1 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 border-none shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-lg">Statut Actuel</CardTitle>
                                    <CardDescription>Vos soumissions de projets</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold text-primary mb-2">{myProjects.length}</div>
                                    <p className="text-sm text-muted-foreground">Projet(s) soumis cette année</p>

                                    <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full mt-6 gap-2">
                                                <Plus className="w-4 h-4" /> Nouveau Projet
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Soumettre un nouveau projet</DialogTitle>
                                                <DialogDescription>Remplissez les détails de votre projet de fin d'études.</DialogDescription>
                                            </DialogHeader>
                                            <ProjectForm onSuccess={() => { fetchMyData(); setIsProjectDialogOpen(false); }} />
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>

                            {/* Projects List */}
                            <div className="md:col-span-2 grid gap-4">
                                {myProjects.length === 0 ? (
                                    <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                                        <BookOpen className="w-12 h-12 mb-4 opacity-20" />
                                        <h3 className="text-lg font-semibold">Aucun projet</h3>
                                        <p>Vous n'avez pas encore soumis de projet.</p>
                                    </Card>
                                ) : (
                                    myProjects.map((p) => (
                                        <Card key={p.id} className="hover:shadow-md transition-shadow group">
                                            <CardContent className="p-6 flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Link
                                                            to={`/projet/${p.id}`}
                                                            className="font-bold text-lg group-hover:text-primary transition-colors no-underline "
                                                        >
                                                            {p.titre}
                                                        </Link>
                                                        <Badge variant={p.visibilite === 'public' ? 'default' : 'secondary'}>
                                                            {p.visibilite}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{p.description}</p>
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <span className="bg-secondary px-2 py-1 rounded">{p.filiere}</span>
                                                        <span>Année: {p.annee}</span>
                                                    </div>
                                                </div>
                                                <Badge className={`${p.etat === 'validé' ? 'bg-green-500' :
                                                    p.etat === 'refusé' ? 'bg-red-500' : 'bg-orange-500'
                                                    }`}>
                                                    {p.etat?.replace('_', ' ')}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="stages" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Summary Card */}
                            <Card className="md:col-span-1 bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800 border-none shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-lg">Vos Stages</CardTitle>
                                    <CardDescription>Suivi de vos demandes</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold text-emerald-600 mb-2">{myStages.length}</div>
                                    <p className="text-sm text-muted-foreground">Stage(s) enregistré(s)</p>

                                    <Dialog open={isStageDialogOpen} onOpenChange={setIsStageDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full mt-6 gap-2 bg-emerald-600 hover:bg-emerald-700">
                                                <Plus className="w-4 h-4" /> Ajouter un Stage
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Ajouter un stage</DialogTitle>
                                                <DialogDescription>Détails de votre stage (entreprise, durée...).</DialogDescription>
                                            </DialogHeader>
                                            <StageForm onSuccess={() => { fetchMyData(); setIsStageDialogOpen(false); }} />
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>

                            <div className="md:col-span-2 grid gap-4">
                                {myStages.length === 0 ? (
                                    <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                                        <Briefcase className="w-12 h-12 mb-4 opacity-20" />
                                        <h3 className="text-lg font-semibold">Aucun stage</h3>
                                        <p>Aucun stage enregistré pour le moment.</p>
                                    </Card>
                                ) : (
                                    myStages.map((s) => (
                                        <Card key={s.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-lg">{s.entreprise}</h3>
                                                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                                            <span>📍 {s.ville}</span>
                                                            <span>•</span>
                                                            <span>⏱️ {s.duree}</span>
                                                        </p>
                                                    </div>
                                                    <Badge variant="outline">{s.visibilite}</Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="suivi" className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="shadow-md border-none bg-gradient-to-br from-orange-50 to-white dark:from-slate-900 dark:to-slate-800">
                                <CardHeader>
                                    <CardTitle>Mettre à jour l'avancement</CardTitle>
                                    <CardDescription>Rapportez votre progression hebdomadaire</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SuiviForm onSuccess={fetchMyData} projectIds={myProjects} stageIds={myStages} />
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Historique des suivis</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {mySuivis.length === 0 ? <p className="text-muted-foreground">Aucun suivi enregistré.</p> : (
                                        <div className="space-y-4">
                                            {mySuivis.map((suivi: any) => (
                                                <div key={suivi.id} className="border-l-4 border-primary pl-4 py-2">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-bold text-lg text-primary">{suivi.pourcentage_avancement}%</span>
                                                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                                            {new Date(suivi.date_suivi).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300">{suivi.description_travaux}</p>
                                                    {suivi.commentaire_encadrant && (
                                                        <div className="mt-2 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-sm border border-yellow-100 dark:border-yellow-900/50">
                                                            <strong className="text-yellow-700 dark:text-yellow-500">Note de l'encadrant:</strong>
                                                            <p className="mt-1">{suivi.commentaire_encadrant}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            )}

            {user.role === 'encadrant' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Espace Encadrant</CardTitle>
                        <CardDescription>Veuillez utiliser la page dédiée "Professeur" pour une meilleure expérience.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => navigate('/professor')}>Aller à l'espace Professeur</Button>
                    </CardContent>
                </Card>
            )}

            {user.role === 'administrateur' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Espace Administrateur</CardTitle>
                        <CardDescription>Veuillez utiliser la page dédiée "Admin" pour une meilleure expérience.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => navigate('/admin')}>Aller à l'espace Admin</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Dashboard;
