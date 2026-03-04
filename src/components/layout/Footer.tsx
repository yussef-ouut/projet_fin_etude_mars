import { Link } from "react-router-dom";
import { GraduationCap, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  produit: {
    title: "Produit",
    links: [
      { name: "Fonctionnalités", href: "/fonctionnalites" },
      { name: "À propos", href: "/a-propos" },
      { name: "Contact", href: "/contact" },
    ],
  },
  bibliotheque: {
    title: "Bibliothèque",
    links: [
      { name: "Projets validés", href: "/bibliotheque/projets" },
      { name: "Stages validés", href: "/bibliotheque/stages" },
      { name: "Recherche avancée", href: "/bibliotheque" },
    ],
  },
  etudiant: {
    title: "Espace Étudiant",
    links: [
      { name: "Mon projet", href: "/app/etudiant" },
      { name: "Suivi d'avancement", href: "/app/etudiant/suivi" },
      { name: "Dépôt de rapport", href: "/app/etudiant/rapport" },
    ],
  },
  encadrant: {
    title: "Espace Encadrant",
    links: [
      { name: "Mes étudiants", href: "/app/encadrant" },
      { name: "Validation", href: "/app/encadrant/validation" },
      { name: "Rapports", href: "/app/encadrant/rapports" },
    ],
  },
  admin: {
    title: "Administration",
    links: [
      { name: "Gestion utilisateurs", href: "/app/admin" },
      { name: "Publications", href: "/app/admin/publications" },
      { name: "Statistiques", href: "/app/admin/stats" },
    ],
  },
  legal: {
    title: "Légal",
    links: [
      { name: "Mentions légales", href: "/mentions-legales" },
      { name: "Politique de confidentialité", href: "/confidentialite" },
      { name: "CGU", href: "/cgu" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/logo-bts.jpg" alt="BTS M6 Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold">
                <span className="text-primary">Bibliotheque</span>
                <span className="text-muted-foreground"> BTS M6</span>
              </span>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Tous droits réservés
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@btsm6.ma"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Made with */}
          <p className="text-sm text-muted-foreground">
            Projet PFE — Gestion & Bibliothèque Pédagogique
          </p>
        </div>
      </div>
    </footer>
  );
}
