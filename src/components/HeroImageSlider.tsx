import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroSlide1 from '@/assets/hero-slide-1.jpg';
import heroSlide2 from '@/assets/hero-slide-2.jpg';
import heroSlide3 from '@/assets/hero-slide-3.jpg';
import heroLogistics from '@/assets/hero-logistics.jpg';

const slides = [
  { id: 1, image: heroSlide1, title: 'Global Warehouse Solutions' },
  { id: 2, image: heroSlide2, title: 'Ocean Freight Services' },
  { id: 3, image: heroSlide3, title: 'Air Cargo Excellence' },
  { id: 4, image: heroLogistics, title: 'Express Delivery Network' },
];

export const HeroImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 10000);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slide Images */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent shadow-glow scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-gradient-accent transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide % slides.length) / slides.length) * 100 + (1 / slides.length) * 100}%`,
              animation: isPlaying ? 'progress 5s linear infinite' : 'none'
            }}
          />
        </div>
      )}

      {/* Slide Title */}
      <div className="absolute bottom-20 left-6 z-20 animate-fade-in">
        <div className="bg-black/20 backdrop-blur-md rounded-lg px-4 py-2 text-white">
          <p className="text-sm font-medium">{slides[currentSlide].title}</p>
        </div>
      </div>
    </div>
  );
};