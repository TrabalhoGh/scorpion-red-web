
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black border-b border-scorpion-gray/30 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-scorpion-red font-bold text-2xl mr-2">SCORPION</span>
            <span className="text-white font-medium text-lg">SECURITY</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-white hover:text-scorpion-red transition-colors">
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-scorpion-red hover:bg-transparent">
                  Serviços
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-scorpion-gray p-6 no-underline outline-none focus:shadow-md"
                          to="/services"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Todos os Serviços
                          </div>
                          <p className="text-sm leading-tight text-white/70">
                            Conheça nossa gama completa de serviços de segurança física e digital.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/legal-services"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-scorpion-gray hover:text-white focus:bg-scorpion-gray focus:text-white"
                        >
                          <div className="text-sm font-medium leading-none">Serviços Jurídicos</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Proteção legal especializada para homens.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/services"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-scorpion-gray hover:text-white focus:bg-scorpion-gray focus:text-white"
                        >
                          <div className="text-sm font-medium leading-none">Segurança Física</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Proteção pessoal e monitoramento.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/services"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-scorpion-gray hover:text-white focus:bg-scorpion-gray focus:text-white"
                        >
                          <div className="text-sm font-medium leading-none">Segurança Digital</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Proteção contra ameaças cibernéticas.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about" className="text-white hover:text-scorpion-red transition-colors">
                  Sobre
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contact" className="text-white hover:text-scorpion-red transition-colors">
                  Contato
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button className="bg-scorpion-red hover:bg-scorpion-red/80 text-white">
            Linha de Emergência
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-scorpion-black border-t border-scorpion-gray/20 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-scorpion-red py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-white hover:text-scorpion-red py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              to="/legal-services" 
              className="text-white hover:text-scorpion-red py-2 transition-colors pl-4 border-l border-scorpion-gray/30"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços Jurídicos
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-scorpion-red py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-scorpion-red py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Button 
              className="bg-scorpion-red hover:bg-scorpion-red/80 text-white w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Linha de Emergência
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
