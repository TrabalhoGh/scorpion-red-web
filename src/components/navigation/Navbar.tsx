
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-scorpion-red transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-white hover:text-scorpion-red transition-colors">
            Services
          </Link>
          <Link to="/about" className="text-white hover:text-scorpion-red transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-scorpion-red transition-colors">
            Contact
          </Link>
          <Button className="bg-scorpion-red hover:bg-scorpion-red/80 text-white">
            Emergency Line
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
              Services
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-scorpion-red py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-scorpion-red py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              className="bg-scorpion-red hover:bg-scorpion-red/80 text-white w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Emergency Line
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
