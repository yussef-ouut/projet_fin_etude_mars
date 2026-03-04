import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  FolderKanban,
  Briefcase,
  BookOpen,
  Target,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Info,
  Shield
} from "lucide-react";
import { useState } from "react";

const pedagogicalGoals = [
  {
    icon: BookOpen,
    title: "Aider les nouveaux étudiants",
    description: "Découvrez les projets réalisés par vos prédécesseurs pour mieux choisir votre sujet.",
  },
  {
    icon: Target,
    title: "Comprendre les attentes",
    description: "Explorez les stages validés pour comprendre ce que les entreprises recherchent.",
  },
  {
    icon: Lightbulb,
    title: "Valoriser les travaux",
    description: "Mettez en lumière le travail des étudiants et inspirez les promotions futures.",
  },
  {
    icon: GraduationCap,
    title: "Améliorer l'orientation",
    description: "Utilisez les données historiques pour mieux orienter vos choix de carrière.",
  },
];

const Bibliotheque = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <BookOpen className="w-4 h-4" />
              Ressources pédagogiques
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 animate-fade-in animation-delay-100">
              BTS Marrakech Mohammed VI -{" "}
              <span className="gradient-text">Formation Professionnelle d'Excellence</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 animate-fade-in animation-delay-200">
              Explorez les travaux validés des années précédentes.
              Une source d'inspiration pour votre parcours académique.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-fade-in animation-delay-300">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un projet, un stage, une technologie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-xl glass border-border/50"
              />
              <Button
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {/* Handle search */ }}
              >
                Rechercher
              </Button>
            </div>

            {/* Quick filter chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in animation-delay-300">
              {["React", "Python", "Machine Learning", "E-commerce", "Mobile"].map((tag) => (
                <button key={tag} className="filter-chip">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Entry Cards Section */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Projets Card */}
            <Link to="/bibliotheque/projets" className="group">
              <Card className="glass card-hover h-full border-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FolderKanban className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    Projets de Fin d'Études
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Découvrez les PFE validés, classés par filière, année et thématique.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex gap-2 flex-wrap">
                    <span className="filter-chip text-xs">500+ projets</span>
                    <span className="filter-chip text-xs">Tous niveaux</span>
                    <span className="filter-chip text-xs">Multi-filières</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Stages Card */}
            <Link to="/bibliotheque/stages" className="group">
              <Card className="glass card-hover h-full border-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    Stages en Entreprise
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    Explorez les expériences de stage par entreprise, ville et domaine.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex gap-2 flex-wrap">
                    <span className="filter-chip text-xs">300+ stages</span>
                    <span className="filter-chip text-xs">100+ entreprises</span>
                    <span className="filter-chip text-xs">Maroc entier</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Pedagogical Goals Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi cette bibliothèque ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Un outil pédagogique conçu pour accompagner les étudiants tout au long de leur parcours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pedagogicalGoals.map((goal, index) => (
              <Card
                key={goal.title}
                className="glass border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <goal.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{goal.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="glass border-info/20 max-w-4xl mx-auto">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-info" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Contenu validé uniquement
                </h3>
                <p className="text-muted-foreground">
                  Seuls les projets et stages approuvés par l'administration sont visibles dans cette bibliothèque publique.
                  Le contenu a été vérifié pour garantir sa qualité et sa pertinence pédagogique.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Items Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Récemment ajoutés</h2>
            <Link to="/bibliotheque/projets">
              <Button variant="ghost" className="gap-2">
                Voir tout
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "projet",
                title: "Plateforme E-learning avec IA",
                category: "Génie Logiciel",
                year: "2024",
                tags: ["React", "Python", "TensorFlow"],
              },
              {
                type: "stage",
                title: "Développeur Full Stack",
                category: "OCP Group • Casablanca",
                year: "2024",
                tags: ["Node.js", "React", "PostgreSQL"],
              },
              {
                type: "projet",
                title: "Application Mobile de Santé",
                category: "Génie Informatique",
                year: "2024",
                tags: ["Flutter", "Firebase", "ML Kit"],
              },
            ].map((item, index) => (
              <Card key={index} className="glass card-hover">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === "projet" ? (
                      <FolderKanban className="w-4 h-4 text-primary" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-accent" />
                    )}
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {item.type}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {item.category} • {item.year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="filter-chip text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bibliotheque;
