import { useState } from 'react';
import { Send, Phone, Mail, Clock, MessageSquare, HelpCircle, Shield, Award, Users, Globe } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';

const faqs = [
  {
    question: 'How can I track my package?',
    answer: 'You can track your package by entering your tracking number on our tracking page or homepage. You will receive real-time updates about your shipment\'s location and estimated delivery time.'
  },
  {
    question: 'What shipping options do you offer?',
    answer: 'We offer various shipping options including Express Delivery (1-2 days), Standard Shipping (3-5 days), Economy Shipping (5-7 days), and International Shipping. Each option comes with different pricing and delivery timeframes.'
  },
  {
    question: 'How do I calculate shipping costs?',
    answer: 'Shipping costs are calculated based on package weight, dimensions, destination, and selected service level. You can get an instant quote using our shipping calculator or contact our team for bulk shipping rates.'
  },
  {
    question: 'What items cannot be shipped?',
    answer: 'We cannot ship hazardous materials, illegal items, perishable goods without proper packaging, weapons, and certain chemicals. Please refer to our prohibited items list for complete details.'
  },
  {
    question: 'How do I file a claim for damaged or lost items?',
    answer: 'To file a claim, contact our customer service team within 30 days of delivery (or expected delivery for lost items). You\'ll need your tracking number, photos of damage, and proof of value.'
  },
  {
    question: 'Do you provide insurance for shipments?',
    answer: 'Yes, we offer comprehensive insurance coverage for your shipments. Basic coverage is included with all services, and additional insurance can be purchased based on the declared value of your items.'
  }
];

const features = [
  {
    icon: Shield,
    title: 'Secure Shipping',
    description: 'End-to-end security with real-time monitoring and insurance coverage for peace of mind.'
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    description: 'Recognized globally for excellence in logistics and customer satisfaction.'
  },
  {
    icon: Users,
    title: '24/7 Expert Support',
    description: 'Round-the-clock customer service from our team of logistics professionals.'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Extensive worldwide network ensuring reliable delivery to over 50 countries.'
  }
];

const CustomerServicePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              Customer Service
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We're here to help! Get support, track packages, or learn more about our services.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-2">Speak with our experts</p>
              <p className="text-lg font-semibold text-primary">+1-800-SPAN-TRUE</p>
              <p className="text-sm text-muted-foreground">24/7 Support</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">Get detailed support</p>
              <p className="text-lg font-semibold text-primary">support@spantrue.com</p>
              <p className="text-sm text-muted-foreground">Response within 4 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-2">Instant assistance</p>
              <Button className="btn-hero mt-2">Start Chat</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold font-poppins mb-6">Send Us a Message</h2>
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your inquiry"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium mb-2">
                        Priority Level
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Standard support</option>
                        <option value="high">High - Urgent issue</option>
                        <option value="critical">Critical - Emergency</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your inquiry in detail..."
                        className="resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-hero"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-3xl font-bold font-poppins mb-6">Frequently Asked Questions</h2>
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <div className="flex items-center">
                            <HelpCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 pl-8 text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
              
              {/* Business Hours */}
              <Card className="card-elevated mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">8:00 AM - 8:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Emergency support available 24/7 for critical issues
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Why Choose <span className="bg-gradient-accent bg-clip-text text-transparent">SpanTrue Courier</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our world-class logistics solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerServicePage;