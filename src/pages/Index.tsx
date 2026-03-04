import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Library,
  FolderKanban,
  Briefcase,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Bibliothèque Pédagogique",
    description: "Accédez aux projets et stages validés des années précédentes pour vous inspirer.",
  },
  {
    icon: FolderKanban,
    title: "Suivi de Projet",
    description: "Gérez votre avancement avec une timeline claire et des jalons définis.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Travaillez en équipe et communiquez facilement avec vos encadrants.",
  },
  {
    icon: BarChart3,
    title: "Statistiques",
    description: "Visualisez votre progression et comparez-vous aux objectifs.",
  },
];

const stats = [
  { value: "500+", label: "Projets validés" },
  { value: "300+", label: "Stages documentés" },
  { value: "50+", label: "Encadrants actifs" },
  { value: "95%", label: "Taux de réussite" },
];

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Plateforme de gestion PFE & Stages 2026
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in animation-delay-100">
              Gérez vos{" "}
              <span className="gradient-text">projets</span>
              {" "}et{" "}
              <span className="gradient-text">stages</span>
              {" "}en toute simplicité
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Une plateforme moderne pour les étudiants, encadrants et administrateurs.
              Suivez l'avancement, partagez les rapports et valorisez les travaux validés.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-300">
              <Link to="/bibliotheque">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <Library className="w-5 h-5" />
                  Explorer la bibliothèque
                </Button>
              </Link>
              <Link to={isAuthenticated ? (user?.role === 'etudiant' ? '/app/etudiant' : user?.role === 'encadrant' ? '/app/encadrant' : '/app/admin') : "/auth"}>
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  {isAuthenticated ? "Mon Tableau de bord" : "Accéder à mon espace"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Keyboard shortcut hint */}
            <p className="mt-6 text-sm text-muted-foreground animate-fade-in animation-delay-300">
              Astuce: Appuyez sur{" "}
              <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-mono">⌘K</kbd>
              {" "}pour rechercher rapidement
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-muted-foreground text-lg">
              Une suite d'outils complète pour gérer efficacement vos projets de fin d'études et stages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="glass card-hover border-border/50 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Library Preview Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Une bibliothèque riche en{" "}
                <span className="gradient-text">ressources pédagogiques</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Explorez les projets et stages des années précédentes. Inspirez-vous des travaux validés
                pour mieux orienter votre propre parcours.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Projets validés par filière et thème",
                  "Stages documentés par entreprise et domaine",
                  "Rapports accessibles aux visiteurs",
                  "Filtres avancés et recherche intelligente",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/bibliotheque">
                <Button size="lg" className="gap-2">
                  Découvrir la bibliothèque
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="glass card-hover p-6 col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Application E-commerce</h4>
                    <p className="text-sm text-muted-foreground">Génie Logiciel • 2024</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="filter-chip text-xs">React</span>
                  <span className="filter-chip text-xs">Node.js</span>
                  <span className="filter-chip text-xs">MongoDB</span>
                </div>
              </Card>
              <Card className="glass card-hover p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-semibold mb-1">OCP Group</h4>
                <p className="text-sm text-muted-foreground">Casablanca • Dev</p>
              </Card>
              <Card className="glass card-hover p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-semibold mb-1">INWI</h4>
                <p className="text-sm text-muted-foreground">Rabat • Data</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="glass border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            <CardContent className="p-12 text-center relative z-10">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-6 shadow-md">
                <img src="/logo-bts.jpg" alt="BTS M6 Logo" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Rejoignez la plateforme et commencez à gérer vos projets et stages de manière efficace.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth">
                  <Button size="lg" className="gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Créer un compte
                  </Button>
                </Link>
                <Link to="/a-propos">
                  <Button size="lg" variant="outline">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
