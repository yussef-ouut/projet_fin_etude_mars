import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role if possible, otherwise dashboard
      const role = user.role;
      if (role === 'etudiant') navigate('/app/etudiant');
      else if (role === 'encadrant') navigate('/app/encadrant');
      else if (role === 'administrateur') navigate('/app/admin');
      else navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup Form State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    // ... existing login logic ...
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await api.fetch<any>('/auth/login', {
        method: 'POST',
        body: { email: loginEmail, password: loginPassword },
      });

      login(data.token, data.user);
      toast.success(`Bienvenue, ${data.user.nom} !`);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error.message || "Erreur de connexion impossible de joindre le serveur");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    // ... existing signup logic ...
    e.preventDefault();
    if (signupPassword !== signupConfirm) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    try {
      const data = await api.fetch<any>('/auth/register', {
        method: 'POST',
        body: {
          nom: signupName,
          email: signupEmail,
          password: signupPassword,
          role: 'etudiant'
        },
      });

      if (!data) throw new Error('Registration failed');

      // Auto-login logic
      if (data.token && data.user) {
        login(data.token, data.user);
        toast.success('Compte créé ! Bienvenue.');
        navigate('/dashboard');
      } else {
        // Fallback if no token (should not happen with new backend)
        toast.success('Compte créé ! Veuillez vous connecter.');
        setSignupName("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupConfirm("");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ... Left Side remains same ... */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primary to-purple-800 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="z-10 text-center space-y-6 max-w-lg">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/20">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">PFE Manager</h1>
          <p className="text-xl text-blue-100 font-light">
            La plateforme d'excellence pour la gestion de vos projets de fin d'études et stages.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg">Pour les Étudiants</h3>
              <p className="text-sm text-blue-100 opacity-80">Soumettez vos sujets, trouvez des stages et suivez votre avancement.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg">Pour les Professeurs</h3>
              <p className="text-sm text-blue-100 opacity-80">Validez les sujets, encadrez les étudiants et gérez les soutenances.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* ... Header remains same ... */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">PFE Manager</h1>
          </div>

          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Bienvenue</h2>
            <p className="text-muted-foreground">
              Connectez-vous ou créez un compte pour commencer
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="login" className="text-base">Connexion</TabsTrigger>
              <TabsTrigger value="signup" className="text-base">Inscription</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="login">
                {/* ... Login Form remains same ... */}
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email professionnel</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Saisir votre email professionnel"
                        className="pl-10 h-10"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Mot de passe</Label>
                      <Link to="#" className="text-sm font-medium text-primary hover:underline">
                        Oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-10"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base bg-gradient-to-r from-primary to-purple-600 hover:opacity-90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Se connecter"}
                  </Button>
                </motion.form>
              </TabsContent>

              <TabsContent value="signup">
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        placeholder="Prénom Nom"
                        className="pl-10 h-10"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email professionnel</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Saisir votre email professionnel"
                        className="pl-10 h-10"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="••••••"
                          className="h-10 pr-8"
                          required
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                          {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirmer</Label>
                      <div className="relative">
                        <Input
                          id="signup-confirm"
                          type={showSignupConfirm ? "text" : "password"}
                          placeholder="••••••"
                          className="h-10 pr-8"
                          required
                          value={signupConfirm}
                          onChange={(e) => setSignupConfirm(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupConfirm(!showSignupConfirm)}
                          className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                          {showSignupConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 mt-2" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Créer un compte"}
                  </Button>


                  <p className="text-xs text-center text-muted-foreground mt-4">
                    En vous inscrivant, vous acceptez nos <Link to="#" className="underline">CGU</Link>.
                  </p>
                </motion.form>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <div className="text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
              <ArrowRight className="w-4 h-4 rotate-180" /> Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
