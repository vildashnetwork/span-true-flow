import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (

    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground font-poppins">Starwood Express Logistics</h1>
              <p className="text-xs text-muted-foreground">Global Logistics</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground'
                }`}
            >
              Home
            </Link>
            <Link
              to="/tracking"
              className={`font-medium transition-colors hover:text-primary ${isActive('/tracking') ? 'text-primary' : 'text-foreground'
                }`}
            >
              Track Package
            </Link>
            <Link
              to="/customer-service"
              className={`font-medium transition-colors hover:text-primary ${isActive('/customer-service') ? 'text-primary' : 'text-foreground'
                }`}
            >
              Support
            </Link>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                {/* <span>+1(954) 358-7810</span> */}
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>starwoodexpresslogistics@gmail.com</span>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/tracking">
              <Button className="btn-hero">
                Track Package
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                to="/"
                className={`font-medium ${isActive('/') ? 'text-primary' : 'text-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/tracking"
                className={`font-medium ${isActive('/tracking') ? 'text-primary' : 'text-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Track Package
              </Link>
              <Link
                to="/customer-service"
                className={`font-medium ${isActive('/customer-service') ? 'text-primary' : 'text-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Support
              </Link>
              <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{"+1 (954) 358-7810 "}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>starwoodexpresslogistics@gmail.com</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
