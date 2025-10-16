import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, UserPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, informe um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha precisa ter pelo menos 6 caracteres.",
  }),
  fullName: z.string().min(3, {
    message: "O nome completo precisa ter pelo menos 3 caracteres.",
  }),
  state: z.string().min(2, {
    message: "Por favor, selecione um estado.",
  }),
  userType: z.enum(["client", "lawyer"], {
    required_error: "Por favor, selecione um tipo de usuário.",
  }),
  description: z.string().optional(),
});

const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/profile");
      }
    };
    
    checkSession();
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      state: "",
      userType: "client",
      description: "",
    },
  });

  const watchUserType = form.watch("userType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      
      // 1. Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            user_type: values.userType,
          },
        }
      });

      if (authError) {
        toast.error("Erro ao criar conta: " + authError.message);
        return;
      }

      if (authData.user) {
        // 2. Adicionar tipo de usuário na tabela user_roles
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert([
            {
              user_id: authData.user.id,
              user_type: values.userType,
            },
          ]);

        if (roleError) {
          toast.error("Erro ao definir tipo de usuário: " + roleError.message);
          return;
        }

        // 3. Adicionar informações do perfil
        const tableName = values.userType === "lawyer" ? "lawyers" : "clients";
        
        const { error: profileError } = await supabase
          .from(tableName)
          .insert([
            {
              user_id: authData.user.id,
              full_name: values.fullName,
              email: values.email,
              state: values.state,
              description: values.description || "",
            },
          ]);

        if (profileError) {
          toast.error("Erro ao criar perfil: " + profileError.message);
          return;
        }

        toast.success("Conta criada com sucesso!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16 flex items-center justify-center">
        <Card className="w-full max-w-md border-scorpion-gray/30 bg-scorpion-gray/10 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-10 w-10 text-scorpion-red" />
            </div>
            <CardTitle className="text-2xl text-center">Crie sua conta</CardTitle>
            <CardDescription className="text-center text-white/60">
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome completo" 
                          {...field} 
                          className="bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="seu.email@exemplo.com" 
                          {...field} 
                          className="bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                          className="bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-scorpion-gray/20 border-scorpion-gray/30 text-white">
                            <SelectValue placeholder="Selecione seu estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brazilianStates.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tipo de Usuário</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="client" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Cliente
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="lawyer" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Advogado
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {watchUserType === "lawyer" 
                          ? "Descrição dos seus serviços" 
                          : "Descrição do caso ou ajuda necess��ria"}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={
                            watchUserType === "lawyer"
                              ? "Descreva sua experiência e serviços oferecidos..."
                              : "Descreva brevemente o tipo de ajuda que você procura..."
                          }
                          className="min-h-[100px] bg-scorpion-gray/20 border-scorpion-gray/30 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-scorpion-red hover:bg-scorpion-red/80" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-white rounded-full"></div>
                      Cadastrando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" /> Cadastrar
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-white/60 mt-2">
              Já possui uma conta?{" "}
              <Link 
                to="/login" 
                className="text-scorpion-red hover:text-white underline transition-colors"
              >
                Faça login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
