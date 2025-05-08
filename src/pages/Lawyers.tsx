
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Search, MapPin, Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { useNavigate } from "react-router-dom";

type Lawyer = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  state: string;
  description: string;
};

const Lawyers = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLawyers();
  }, []);

  useEffect(() => {
    filterLawyers();
  }, [searchQuery, stateFilter, lawyers]);

  const fetchLawyers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .order("full_name");

      if (error) {
        toast.error("Erro ao carregar advogados: " + error.message);
        return;
      }

      setLawyers(data || []);
      setFilteredLawyers(data || []);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      toast.error("Ocorreu um erro ao carregar a lista de advogados.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterLawyers = () => {
    let filtered = lawyers;

    // Filter by search query (name or description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        lawyer => 
          lawyer.full_name.toLowerCase().includes(query) || 
          (lawyer.description && lawyer.description.toLowerCase().includes(query))
      );
    }

    // Filter by state
    if (stateFilter) {
      filtered = filtered.filter(lawyer => lawyer.state === stateFilter);
    }

    setFilteredLawyers(filtered);
  };

  // Get unique states for filter dropdown
  const uniqueStates = [...new Set(lawyers.map(lawyer => lawyer.state))].sort();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-scorpion-red">Advogados</span> Especializados
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Encontre advogados especializados em proteção legal para homens. 
            Profissionais comprometidos com a defesa dos seus direitos.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-scorpion-gray/10 p-6 rounded-lg border border-scorpion-gray/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nome ou especialidade..."
                  className="pl-10 bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select 
                className="w-full h-10 px-3 py-2 bg-scorpion-gray/20 border border-scorpion-gray/30 rounded-md text-white"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
              >
                <option value="">Todos os estados</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-t-2 border-scorpion-red rounded-full"></div>
          </div>
        ) : filteredLawyers.length === 0 ? (
          <div className="text-center py-12 bg-scorpion-gray/10 rounded-lg border border-scorpion-gray/30">
            <Shield className="h-12 w-12 text-scorpion-red mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Nenhum advogado encontrado</h3>
            <p className="text-white/60">
              Não encontramos advogados com os critérios informados. Tente modificar sua busca.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map(lawyer => (
              <Card key={lawyer.id} className="border-scorpion-gray/30 bg-scorpion-gray/10 backdrop-blur-sm hover:border-scorpion-red/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-scorpion-gray rounded-full p-3">
                      <Shield className="h-6 w-6 text-scorpion-red" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{lawyer.full_name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-white/60">
                        <MapPin className="h-3 w-3" /> {lawyer.state}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-1">Sobre</h4>
                      <p className="text-sm text-white/80 line-clamp-3">
                        {lawyer.description || "Nenhuma descrição fornecida."}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-1">Contato</h4>
                      <p className="flex items-center gap-2 text-sm text-white/80">
                        <Mail className="h-3 w-3 text-scorpion-red" /> {lawyer.email}
                      </p>
                    </div>
                    <div className="pt-2">
                      <Button 
                        className="w-full bg-scorpion-red hover:bg-scorpion-red/80"
                        onClick={() => navigate("/login")}
                      >
                        Entrar em Contato
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Lawyers;
