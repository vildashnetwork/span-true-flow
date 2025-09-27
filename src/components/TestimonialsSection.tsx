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
    content: 'Starwood Express has transformed our logistics operations. Their reliability and tracking system are exceptional. We\'ve reduced shipping delays by 90% since partnering with them.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'E-commerce Director',
    company: 'Global Retail Solutions',
    rating: 5,
    content: 'The best logistics partner we\'ve ever worked with. Their international shipping capabilities and customer service are unmatched. Highly recommended for any business.',
    avatar: 'data:image/jpeg;base64,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'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Operations Manager',
    company: 'MedDevice Inc.',
    rating: 5,
    content: 'Starwood Express  attention to detail and handling of sensitive medical equipment is outstanding. They understand the importance of secure, temperature-controlled shipping.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Park',
    position: 'Logistics Coordinator',
    company: 'AutoParts Express',
    rating: 5,
    content: 'Fast, reliable, and cost-effective. Starwood Express  has helped us expand our reach globally while maintaining the quality our customers expect. Their tracking system is fantastic.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    position: 'Procurement Manager',
    company: 'Fashion Forward',
    rating: 5,
    content: 'Working with Starwood Express  has been a game-changer for our fashion business. They handle our delicate items with care and always deliver on time for our seasonal launches.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Robert Kim',
    position: 'CEO',
    company: 'StartupXYZ',
    rating: 5,
    content: 'As a growing startup, we needed a logistics partner that could scale with us. Starwood Express provided exactly that - flexible solutions that grow with our business needs.',
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
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
              className={`card-elevated p-6 cursor-pointer transition-all duration-300 hover:shadow-glow ${testimonial.id === currentTestimonial.id ? 'ring-2 ring-primary' : ''
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
            Join thousands of satisfied customers who trust Starwood Express Courier
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