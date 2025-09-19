import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, Truck, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeroImageSlider } from './HeroImageSlider';

export const HeroSection = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      navigate(`/tracking?code=${encodeURIComponent(trackingCode)}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <HeroImageSlider />
      
      {/* Overlay */}
      <div className="absolute inset-0 video-overlay" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-floating">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
          <Package className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute top-32 right-16 animate-floating" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-accent/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <Truck className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-floating" style={{ animationDelay: '4s' }}>
        <div className="w-14 h-14 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <Plane className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="animate-fade-in" style={{margin-top: "100px"}}>
          <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-6 leading-tight">
            Fast, Reliable
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Global </span>
            Shipping
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for seamless logistics solutions across the world. 
            We deliver excellence with every package, every time.
          </p>
        </div>

        {/* Tracking Search */}
        <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto card-glass">
            <h2 className="text-2xl font-semibold mb-6">Track Your Package</h2>
            <form onSubmit={handleTrackingSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter tracking code (e.g., ST123456789)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="h-14 text-lg bg-white/90 border-white/30 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button 
                type="submit" 
                className="h-14 px-8 btn-accent text-lg"
                disabled={!trackingCode.trim()}
              >
                <Search className="w-5 h-5 mr-2" />
                Track Package
              </Button>
            </form>
            <p className="text-sm text-gray-300 mt-4">
              Enter your tracking number to get real-time updates on your shipment
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
            <div className="text-sm text-gray-300">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">1M+</div>
            <div className="text-sm text-gray-300">Packages Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">99.8%</div>
            <div className="text-sm text-gray-300">On-Time Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">24/7</div>
            <div className="text-sm text-gray-300">Customer Support</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};