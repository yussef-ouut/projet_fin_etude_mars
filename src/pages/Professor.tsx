import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle,
    Clock,
    FileText,
    Users,
    MessageSquare,
    ClipboardList
} from "lucide-react";

const Professor = () => {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Espace Professeur
                    </h1>
                    <p className="text-muted-foreground mt-1">Suivi des étudiants et validation des projets</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="secondary" className="px-4 py-2 text-sm">
                        <Users className="w-4 h-4 mr-2" /> 12 Étudiants suivis
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 text-sm border-orange-500 text-orange-500">
                        <Clock className="w-4 h-4 mr-2" /> 3 En attente
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <Tabs defaultValue="validations" className="space-y-6">
                        <TabsList className="bg-background border p-1 rounded-xl w-full justify-start overflow-x-auto">
                            <TabsTrigger value="validations" className="rounded-lg">Validations</TabsTrigger>
                            <TabsTrigger value="students" className="rounded-lg">Mes Étudiants</TabsTrigger>
                            <TabsTrigger value="meetings" className="rounded-lg">Réunions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="validations" className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-primary" />
                                Projets à valider
                            </h2>

                            {[1, 2, 3].map((_, i) => (
                                <Card key={i} className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-lg">Mise en place d'une architecture Microservices</h3>
                                                <p className="text-sm text-muted-foreground">Par: Ahmed Benali • Génie Informatique</p>
                                            </div>
                                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">En attente</Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                            Ce projet consiste à refondre l'architecture monolithique existante vers une architecture distribuée...
                                        </p>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm">Voir détails</Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">Valider</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </TabsContent>

                        <TabsContent value="students">
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-center text-muted-foreground">Liste des étudiants suivis...</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column - Activity & Notifications */}
                <div className="space-y-6">
                    <Card className="shadow-md bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 border-none">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-blue-500" />
                                Derniers Messages
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-3 items-start border-b pb-3 last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                        AB
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Ahmed Benali</p>
                                        <p className="text-xs text-muted-foreground mt-1">Monsieur, j'ai une question concernant...</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                Voir tout
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-500" />
                                Dépôts Récents
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Rapport V1 - Sarah K.</span>
                                    <span className="text-muted-foreground text-xs">Hier</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Cahier des charges - Karim M.</span>
                                    <span className="text-muted-foreground text-xs">2j</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Professor;
