import { Link } from 'react-router-dom';
import { Truck, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>

            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins">Starwood Express Logistics</h3>
                <p className="text-sm text-gray-400">Global Logistics</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Your trusted partner for reliable, fast, and secure shipping solutions worldwide.
              We deliver excellence with every package.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-gray-400 hover:text-primary transition-colors">
                  Track Package
                </Link>
              </li>
              <li>
                <Link to="/customer-service" className="text-gray-400 hover:text-primary transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Air Freight</li>
              <li className="text-gray-400">Ocean Freight</li>
              <li className="text-gray-400">Road Freight</li>
              <li className="text-gray-400">Warehousing</li>
              <li className="text-gray-400">Packaging Solutions</li>
              <li className="text-gray-400">Express Delivery</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>123 Logistics Boulevard</p>
                  <p>Commerce City, NY 10001</p>
                  <p>United States</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                {/* <span className="text-gray-400">{"+1 (954) 358-7810"}</span> */}
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">starwoodexpresslogistics@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Starwood Express Courier. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
