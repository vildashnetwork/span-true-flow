import { Target, Eye, Award, Users, Globe, TrendingUp } from 'lucide-react';

const stats = [
  { number: '15+', label: 'Years Experience', icon: Award },
  { number: '50+', label: 'Countries Served', icon: Globe },
  { number: '1M+', label: 'Happy Customers', icon: Users },
  { number: '99.8%', label: 'On-Time Delivery', icon: TrendingUp },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            About <span className="bg-gradient-accent bg-clip-text text-transparent">Starwood Express Courier</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the logistics industry with innovative solutions, global reach,
            and an unwavering commitment to excellence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="card-elevated p-8 hover:shadow-glow transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To revolutionize global logistics by providing innovative, reliable, and sustainable
              shipping solutions that connect businesses and communities worldwide. We strive to
              exceed expectations through cutting-edge technology, exceptional service, and
              unwavering commitment to our customers' success.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Innovation</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Reliability</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Sustainability</span>
            </div>
          </div>

          {/* Vision */}
          <div className="card-elevated p-8 hover:shadow-glow transition-all duration-500">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To be the world's most trusted logistics partner, setting new standards for
              excellence in international shipping and supply chain management. We envision
              a future where distance is no barrier to commerce, and every package delivery
              contributes to building stronger global connections.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Global Leader</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Excellence</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Trust</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-3">Integrity</h4>
              <p className="text-gray-200">
                We operate with transparency, honesty, and ethical practices in all our business dealings.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Excellence</h4>
              <p className="text-gray-200">
                We continuously strive for perfection in service delivery and customer satisfaction.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Innovation</h4>
              <p className="text-gray-200">
                We embrace new technologies and creative solutions to improve logistics efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};