import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  BookOpen, 
  Users, 
  BarChart3,
  Library,
  Shield,
  Lightbulb,
  GraduationCap,
  CheckCircle
} from "lucide-react";

const APropos = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos du <span className="gradient-text">Projet</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Une plateforme moderne pour la gestion des projets de fin d'études et stages, 
              avec une bibliothèque pédagogique pour valoriser les travaux validés.
            </p>
          </div>
        </div>
      </section>

      {/* Contexte */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="glass mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Contexte Général
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Dans le cadre de la gestion académique des établissements d'enseignement supérieur, 
                  le suivi des projets de fin d'études (PFE) et des stages représente un enjeu majeur. 
                  Les processus actuels, souvent manuels ou fragmentés, ne permettent pas une gestion 
                  efficace ni une valorisation optimale des travaux réalisés.
                </p>
                <p>
                  Cette plateforme répond à ce besoin en proposant une solution intégrée qui centralise 
                  toutes les informations, facilite le suivi en temps réel, et met en valeur les travaux 
                  validés à travers une bibliothèque pédagogique accessible à tous.
                </p>
              </CardContent>
            </Card>

            {/* Analyse */}
            <Card className="glass mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="w-6 h-6 text-primary" />
                  Analyse du Sujet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">1</span>
                      Problématiques identifiées
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Manque de visibilité sur l'avancement des projets
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Difficulté de communication entre étudiants et encadrants
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Absence de capitalisation des travaux passés
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Processus de validation non standardisés
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm">2</span>
                      Solutions apportées
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        Timeline de suivi avec mise à jour en temps réel
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        Système de commentaires et validation intégré
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        Bibliothèque publique des travaux validés
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                        Workflow de publication contrôlé par l'admin
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objectifs */}
            <Card className="glass mb-8 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  Objectifs du Projet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Gestion Interne
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Centraliser le suivi des projets et stages",
                        "Faciliter la communication étudiant-encadrant",
                        "Standardiser le processus de validation",
                        "Générer des rapports de suivi automatisés",
                        "Gérer les affectations et les équipes",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Library className="w-5 h-5 text-accent" />
                      Bibliothèque Pédagogique
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Valoriser les travaux des promotions passées",
                        "Aider les nouveaux étudiants dans leur choix",
                        "Documenter les expériences de stage",
                        "Créer une base de connaissances pérenne",
                        "Améliorer l'orientation professionnelle",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pedagogical Goals Callout */}
            <Card className="glass border-accent/30 bg-accent/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Pourquoi une bibliothèque publique ?</h3>
                    <p className="text-muted-foreground mb-4">
                      La bibliothèque pédagogique est au cœur de ce projet. Elle permet de :
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-accent mt-0.5" />
                        <span className="text-sm">Garantir la qualité avec une validation admin</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-5 h-5 text-accent mt-0.5" />
                        <span className="text-sm">Offrir des exemples concrets aux nouveaux étudiants</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BarChart3 className="w-5 h-5 text-accent mt-0.5" />
                        <span className="text-sm">Analyser les tendances et thématiques populaires</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="w-5 h-5 text-accent mt-0.5" />
                        <span className="text-sm">Améliorer l'orientation et les choix de carrière</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;
