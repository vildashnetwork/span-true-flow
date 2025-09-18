import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Supply Chain Manager',
    company: 'TechCorp Industries',
    rating: 5,
    content: 'SpanTrue Courier has transformed our logistics operations. Their reliability and tracking system are exceptional. We\'ve reduced shipping delays by 90% since partnering with them.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c9?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'E-commerce Director',
    company: 'Global Retail Solutions',
    rating: 5,
    content: 'The best logistics partner we\'ve ever worked with. Their international shipping capabilities and customer service are unmatched. Highly recommended for any business.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Operations Manager',
    company: 'MedDevice Inc.',
    rating: 5,
    content: 'SpanTrue\'s attention to detail and handling of sensitive medical equipment is outstanding. They understand the importance of secure, temperature-controlled shipping.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Park',
    position: 'Logistics Coordinator',
    company: 'AutoParts Express',
    rating: 5,
    content: 'Fast, reliable, and cost-effective. SpanTrue has helped us expand our reach globally while maintaining the quality our customers expect. Their tracking system is fantastic.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    position: 'Procurement Manager',
    company: 'Fashion Forward',
    rating: 5,
    content: 'Working with SpanTrue has been a game-changer for our fashion business. They handle our delicate items with care and always deliver on time for our seasonal launches.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Robert Kim',
    position: 'CEO',
    company: 'StartupXYZ',
    rating: 5,
    content: 'As a growing startup, we needed a logistics partner that could scale with us. SpanTrue provided exactly that - flexible solutions that grow with our business needs.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            What Our <span className="bg-gradient-accent bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about our services.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card-elevated p-8 md:p-12 text-center relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote className="w-16 h-16 text-primary" />
            </div>

            {/* Stars */}
            <div className="flex justify-center mb-6">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-xl md:text-2xl text-foreground mb-8 italic leading-relaxed">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div className="text-left">
                <div className="font-semibold text-lg">{currentTestimonial.name}</div>
                <div className="text-muted-foreground">{currentTestimonial.position}</div>
                <div className="text-primary font-medium">{currentTestimonial.company}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-primary scale-125'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`card-elevated p-6 cursor-pointer transition-all duration-300 hover:shadow-glow ${
                testimonial.id === currentTestimonial.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => goToTestimonial(testimonials.findIndex(t => t.id === testimonial.id))}
            >
              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers who trust SpanTrue Courier
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero">
              Get Started Today
            </Button>
            <Button variant="outline" className="btn-outline">
              Read More Reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};