import { Plane, Ship, Truck, Warehouse, Package, Clock } from 'lucide-react';
import airFreightImage from '@/assets/air-freight.jpg';
import oceanFreightImage from '@/assets/ocean-freight.jpg';
import warehousingImage from '@/assets/warehousing.jpg';
import roadFreightImage from '@/assets/road-freight.jpg';
import packagingImage from '@/assets/packaging.jpg';
import expressDeliveryImage from '@/assets/express-delivery.jpg';

const services = [
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Fast and secure air transportation for time-sensitive shipments worldwide.',
    image: airFreightImage,
    features: ['Express Delivery', 'Global Network', 'Real-time Tracking', 'Secure Handling'],
  },
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'Cost-effective sea transportation for large volume shipments.',
    image: oceanFreightImage,
    features: ['Container Shipping', 'Bulk Cargo', 'Port-to-Port', 'Customs Clearance'],
  },
  {
    icon: Truck,
    title: 'Road Freight',
    description: 'Reliable ground transportation for domestic and regional deliveries.',
    image: roadFreightImage,
    features: ['Door-to-Door', 'Local Delivery', 'Interstate Transport', 'Flexible Scheduling'],
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Secure storage and distribution services with advanced inventory management.',
    image: warehousingImage,
    features: ['Climate Control', 'Inventory Management', 'Pick & Pack', 'Distribution'],
  },
  {
    icon: Package,
    title: 'Packaging Solutions',
    description: 'Professional packaging services to ensure your goods arrive safely.',
    image: packagingImage,
    features: ['Custom Packaging', 'Protective Materials', 'Labeling', 'Quality Assurance'],
  },
  {
    icon: Clock,
    title: 'Express Delivery',
    description: 'Lightning-fast delivery services for urgent shipments.',
    image: expressDeliveryImage,
    features: ['Same-Day Delivery', 'Next-Day Service', 'Priority Handling', 'Time Guarantee'],
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Our <span className="bg-gradient-accent bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your shipping needs, 
            from express delivery to global freight management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card-elevated p-6 group hover:shadow-glow transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Service Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-border">
                <button className="text-primary font-medium hover:text-primary-dark transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Ship?</h3>
          <p className="text-xl mb-6 text-gray-200">
            Get an instant quote for your shipping needs or contact our experts for a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent">
              Get Quote
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};