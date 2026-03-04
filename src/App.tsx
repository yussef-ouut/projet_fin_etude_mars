import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Bibliotheque from "./pages/Bibliotheque";
import BibliotequeProjets from "./pages/BibliotequeProjets";
import BibliotequeStages from "./pages/BibliotequeStages";
import ProjetDetail from "./pages/ProjetDetail";
import StageDetail from "./pages/StageDetail";
import Rapports from "./pages/Rapports";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import APropos from "./pages/APropos";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Professor from "./pages/Professor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth page without layout */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

            {/* Public pages with layout */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/bibliotheque" element={<Layout><Bibliotheque /></Layout>} />
            <Route path="/bibliotheque/projets" element={<Layout><BibliotequeProjets /></Layout>} />
            <Route path="/bibliotheque/stages" element={<Layout><BibliotequeStages /></Layout>} />
            <Route path="/projet/:id" element={<Layout><ProjetDetail /></Layout>} />
            <Route path="/stage/:id" element={<Layout><StageDetail /></Layout>} />
            <Route path="/rapports" element={<Layout><Rapports /></Layout>} />
            <Route path="/a-propos" element={<Layout><APropos /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Role specific pages */}
            <Route path="/app/etudiant" element={<Layout><Dashboard /></Layout>} />
            <Route path="/app/admin" element={<Layout><Admin /></Layout>} />
            <Route path="/admin" element={<Layout><Admin /></Layout>} />
            <Route path="/app/encadrant" element={<Layout><Professor /></Layout>} />
            <Route path="/professor" element={<Layout><Professor /></Layout>} />

            {/* Catch-all */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
