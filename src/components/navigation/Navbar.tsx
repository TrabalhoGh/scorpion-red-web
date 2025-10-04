
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, LogIn, UserPlus } from "lucide-react";
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
          <Link to="/" className="flex items-center group">
            <Shield className="h-6 w-6 text-scorpion-red mr-2 group-hover:animate-pulse transition-all" />
            <span className="text-scorpion-red font-bold text-2xl mr-2 group-hover:text-white transition-colors">SCORPION</span>
            <span className="text-white font-medium text-lg group-hover:text-scorpion-red transition-colors">SECURITY</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Link to="/" className="text-white hover:text-scorpion-red transition-colors px-3 py-2 rounded-md hover:bg-scorpion-gray/20">
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-scorpion-red hover:bg-scorpion-gray/20">
                  Serviços
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-scorpion-gray p-6 no-underline outline-none focus:shadow-md hover:bg-scorpion-gray/80 transition-colors"
                          to="/services"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Todos os Serviços
                          </div>
                          <p className="text-sm leading-tight text-white/70">
                            Conheça nossa gama completa de serviços de segurança digital e física.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about" className="text-white hover:text-scorpion-red transition-colors px-3 py-2 rounded-md hover:bg-scorpion-gray/20">
                  Sobre
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contact" className="text-white hover:text-scorpion-red transition-colors px-3 py-2 rounded-md hover:bg-scorpion-gray/20">
                  Contato
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex space-x-2">
            <Button asChild variant="ghost" className="text-white hover:text-scorpion-red hover:bg-scorpion-gray/20 border border-scorpion-gray/30">
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Entrar
              </Link>
            </Button>
            <Button asChild className="bg-scorpion-red hover:bg-scorpion-red/80 text-white">
              <Link to="/register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" /> Cadastre-se
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-scorpion-gray/20">
            {isMenuOpen ? (
              <X className="h-6 w-6 text-scorpion-red" />
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
              className="text-white hover:text-scorpion-red py-2 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1 h-6 bg-scorpion-red/50"></span>
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-white hover:text-scorpion-red py-2 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1 h-6 bg-scorpion-red/50"></span>
              Serviços
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-scorpion-red py-2 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1 h-6 bg-scorpion-red/50"></span>
              Sobre
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-scorpion-red py-2 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1 h-6 bg-scorpion-red/50"></span>
              Contato
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                asChild
                variant="ghost" 
                className="w-full justify-center text-white hover:text-scorpion-red hover:bg-scorpion-gray/20 border border-scorpion-gray/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> Entrar
                </Link>
              </Button>
              <Button 
                asChild
                className="w-full justify-center bg-scorpion-red hover:bg-scorpion-red/80 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Cadastre-se
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
