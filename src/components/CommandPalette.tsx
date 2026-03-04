import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  Library,
  FolderKanban,
  Briefcase,
  FileText,
  Mail,
  LogIn,
  User,
  Settings,
  Search,
} from "lucide-react";

const navigationItems = [
  { name: "Accueil", href: "/", icon: Home, keywords: ["home", "main"] },
  { name: "Bibliothèque", href: "/bibliotheque", icon: Library, keywords: ["library", "browse"] },
  { name: "Projets", href: "/bibliotheque/projets", icon: FolderKanban, keywords: ["projects", "pfe"] },
  { name: "Stages", href: "/bibliotheque/stages", icon: Briefcase, keywords: ["internships", "stage"] },
  { name: "Rapports", href: "/rapports", icon: FileText, keywords: ["reports", "documents"] },
  { name: "Contact", href: "/contact", icon: Mail, keywords: ["contact", "email"] },
];

const quickActions = [
  { name: "Se connecter", href: "/auth", icon: LogIn, keywords: ["login", "connexion"] },
  { name: "Mon profil", href: "/profil", icon: User, keywords: ["profile", "account"] },
  { name: "Paramètres", href: "/parametres", icon: Settings, keywords: ["settings"] },
];

// Mock data for search results
const mockProjects = [
  { id: "1", title: "Application de gestion de stock", type: "projet" },
  { id: "2", title: "Plateforme e-learning", type: "projet" },
  { id: "3", title: "Système de réservation", type: "projet" },
];

const mockStages = [
  { id: "1", title: "Stage chez OCP Group - Développeur Full Stack", type: "stage" },
  { id: "2", title: "Stage chez INWI - Data Analyst", type: "stage" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Rechercher une page, un projet, un stage..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => handleSelect(item.href)}
              className="gap-3"
            >
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projets récents">
          {mockProjects.map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() => handleSelect(`/projet/${project.id}`)}
              className="gap-3"
            >
              <FolderKanban className="h-4 w-4 text-primary" />
              <span>{project.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Stages récents">
          {mockStages.map((stage) => (
            <CommandItem
              key={stage.id}
              onSelect={() => handleSelect(`/stage/${stage.id}`)}
              className="gap-3"
            >
              <Briefcase className="h-4 w-4 text-accent" />
              <span>{stage.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions rapides">
          {quickActions.map((action) => (
            <CommandItem
              key={action.href}
              onSelect={() => handleSelect(action.href)}
              className="gap-3"
            >
              <action.icon className="h-4 w-4 text-muted-foreground" />
              <span>{action.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      
      <div className="border-t border-border p-2">
        <p className="text-xs text-muted-foreground text-center">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-xs">⌘</kbd>
          {" + "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-xs">K</kbd>
          {" pour ouvrir • "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-xs">↵</kbd>
          {" pour sélectionner"}
        </p>
      </div>
    </CommandDialog>
  );
}
