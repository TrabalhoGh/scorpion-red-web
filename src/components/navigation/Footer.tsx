
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-scorpion-gray/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-scorpion-red">SCORPION</span> SECURITY
            </h3>
            <p className="text-white/70 mb-4">
              Providing top-tier security solutions since 2010. Your safety is our mission.
            </p>
            <p className="text-white/70">
              Licensed & Insured: #SC12345678
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-scorpion-red">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-scorpion-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-scorpion-red transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-scorpion-red transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-scorpion-red transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-scorpion-red">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/risk" className="text-white/70 hover:text-scorpion-red transition-colors">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/services/cyber" className="text-white/70 hover:text-scorpion-red transition-colors">
                  Cyber Security
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-scorpion-red">Contact Us</h3>
            <address className="not-italic text-white/70">
              <p className="mb-2">1234 Security Avenue</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-2">Email: info@scorpionsecurity.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-scorpion-gray/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 mb-4 md:mb-0">
            © {new Date().getFullYear()} Scorpion Security. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-white/50 hover:text-scorpion-red transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/50 hover:text-scorpion-red transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
