import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, LogOut, User, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Session } from "@supabase/supabase-js";
import { Profile as ProfileType } from "@/types/database";

type UserType = "lawyer" | "client" | null;

const Profile = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState<Partial<ProfileType>>({});

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (!session) {
        navigate("/login");
        return;
      }
      
      // Get user type from meta data
      const type = session?.user?.user_metadata?.user_type as UserType;
      setUserType(type);
      
      // Fetch profile data
      fetchProfile(session.user.id, type);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      
      if (!session) {
        navigate("/login");
        return;
      }
      
      const type = session?.user?.user_metadata?.user_type as UserType;
      setUserType(type);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string, type: UserType) => {
    if (!type) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from(type === "lawyer" ? "lawyers" : "clients")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        toast.error("Erro ao carregar perfil: " + error.message);
        return;
      }

      setProfile(data);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Saiu com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao sair da conta.");
      console.error("Sign out error:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!userType || !session) return;
      
      const { error } = await supabase
        .from(userType === "lawyer" ? "lawyers" : "clients")
        .update({
          full_name: formData.full_name,
          state: formData.state,
          description: formData.description,
        })
        .eq("user_id", session.user.id);

      if (error) {
        toast.error("Erro ao atualizar perfil: " + error.message);
        return;
      }

      toast.success("Perfil atualizado com sucesso!");
      setProfile({...profile!, ...formData as ProfileType});
      setIsEditing(false);
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar o perfil.");
      console.error("Update profile error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-24 pb-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-spin h-8 w-8 border-t-2 border-scorpion-red rounded-full"></div>
            </div>
            <p className="text-white/60">Carregando seu perfil...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <Card className="border-scorpion-gray/30 bg-scorpion-gray/10 backdrop-blur-sm">
            <CardHeader className="relative">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-scorpion-red" />
              </div>
              <CardTitle className="text-2xl text-center">Seu Perfil</CardTitle>
              <CardDescription className="text-center text-white/60">
                {userType === "lawyer" ? "Perfil do Advogado" : "Perfil do Cliente"}
              </CardDescription>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleSignOut}
                className="absolute top-4 right-4 text-white/60 hover:text-scorpion-red hover:bg-scorpion-gray/20"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                // Edit mode form
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full_name">Nome Completo</Label>
                    <Input 
                      id="full_name"
                      name="full_name" 
                      value={formData.full_name || ""} 
                      onChange={handleChange}
                      className="bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email" 
                      value={formData.email || ""} 
                      disabled
                      className="bg-scorpion-gray/10 border-scorpion-gray/30 text-white/60"
                    />
                    <p className="text-xs text-white/40 mt-1">O email não pode ser alterado</p>
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input 
                      id="state"
                      name="state" 
                      value={formData.state || ""} 
                      onChange={handleChange}
                      className="bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">
                      {userType === "lawyer" 
                        ? "Descrição dos seus serviços" 
                        : "Descrição do caso ou ajuda necessária"}
                    </Label>
                    <Textarea 
                      id="description"
                      name="description" 
                      value={formData.description || ""}
                      onChange={handleChange}
                      className="min-h-[100px] bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(profile || {});
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-scorpion-red hover:bg-scorpion-red/80"
                      onClick={handleSaveProfile}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                      className="text-white hover:text-scorpion-red border-scorpion-gray/30 hover:bg-scorpion-gray/20"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Editar Perfil
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-white/60 mb-1">Nome Completo</h3>
                      <p className="text-lg">{profile?.full_name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/60 mb-1">Email</h3>
                      <p className="text-lg">{profile?.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white/60 mb-1">Estado</h3>
                    <p className="text-lg">{profile?.state}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white/60 mb-1">
                      {userType === "lawyer" 
                        ? "Descrição dos Serviços" 
                        : "Descrição do Caso"}
                    </h3>
                    <div className="p-4 bg-scorpion-gray/20 rounded-lg border border-scorpion-gray/30">
                      <p className="whitespace-pre-wrap">{profile?.description || "Nenhuma descrição fornecida."}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white/60 mb-1">Tipo de Usuário</h3>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-scorpion-red" />
                      <p>{userType === "lawyer" ? "Advogado" : "Cliente"}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
