import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Users,
    BookOpen,
    Settings,
    BarChart,
    UserPlus,
    FileText,
    Activity
} from "lucide-react";

// Mock data for the dashboard
const stats = [
    { title: "Total Étudiants", value: "1,234", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Projets Soumis", value: "856", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Stages Actifs", value: "342", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
    { title: "Rapports Validés", value: "521", icon: FileText, color: "text-orange-500", bg: "bg-orange-50" },
];

const Admin = () => {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Espace Administrateur
                    </h1>
                    <p className="text-muted-foreground mt-1">Gestion globale de la plateforme PFE Hub</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Settings className="h-4 w-4" /> Paramètres
                    </Button>
                    <Button className="gap-2 bg-gradient-to-r from-primary to-purple-600">
                        <UserPlus className="h-4 w-4" /> Nouvel Utilisateur
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-background border p-1 rounded-xl h-12">
                    <TabsTrigger value="overview" className="rounded-lg px-6">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="users" className="rounded-lg px-6">Utilisateurs</TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-lg px-6">Configuration</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="col-span-1 shadow-md border-muted/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart className="h-5 w-5 text-primary" /> Activité Récente
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">Nouveau projet soumis</p>
                                                <p className="text-xs text-muted-foreground">Il y a {i * 10 + 5} minutes</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1 shadow-md border-muted/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-purple-600" /> Actions Rapides
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:text-primary transition-colors">
                                    <UserPlus className="h-6 w-6" />
                                    <span>Ajouter Professeur</span>
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-purple-600 hover:text-purple-600 transition-colors">
                                    <FileText className="h-6 w-6" />
                                    <span>Gérer Rapports</span>
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-green-600 hover:text-green-600 transition-colors">
                                    <BookOpen className="h-6 w-6" />
                                    <span>Valider Sujets</span>
                                </Button>
                                <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-orange-600 hover:text-orange-600 transition-colors">
                                    <Settings className="h-6 w-6" />
                                    <span>Système</span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion des Utilisateurs</CardTitle>
                            <CardDescription>Liste de tous les étudiants et professeurs inscrits</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                Composant Table des utilisateurs à implémenter ici
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Admin;
