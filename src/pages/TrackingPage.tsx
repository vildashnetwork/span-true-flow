import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Truck, Plane, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock tracking data
const generateTrackingData = (code: string) => {
  const statuses = [
    { 
      status: 'Order Placed', 
      date: '2024-01-15 09:00 AM',
      location: 'New York, NY',
      description: 'Package information received',
      completed: true 
    },
    { 
      status: 'Processing', 
      date: '2024-01-15 11:30 AM',
      location: 'Distribution Center, NY',
      description: 'Package processed and sorted',
      completed: true 
    },
    { 
      status: 'In Transit', 
      date: '2024-01-16 06:45 AM',
      location: 'Chicago, IL',
      description: 'Package in transit to destination',
      completed: true,
      active: true 
    },
    { 
      status: 'Out for Delivery', 
      date: 'Expected: 2024-01-17 10:00 AM',
      location: 'Los Angeles, CA',
      description: 'Package out for final delivery',
      completed: false 
    },
    { 
      status: 'Delivered', 
      date: 'Expected: 2024-01-17 05:00 PM',
      location: 'Destination Address',
      description: 'Package delivered successfully',
      completed: false 
    },
  ];

  return {
    trackingCode: code,
    status: 'In Transit',
    estimatedDelivery: '2024-01-17',
    sender: {
      name: 'TechStore Inc.',
      address: '123 Business Ave, New York, NY 10001'
    },
    receiver: {
      name: 'John Smith',
      address: '456 Residential St, Los Angeles, CA 90210'
    },
    package: {
      weight: '2.5 lbs',
      dimensions: '12" x 8" x 4"',
      service: 'Express Delivery',
      value: '$299.99'
    },
    timeline: statuses,
    progress: 60
  };
};

const TrackingPage = () => {
  const [searchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState(searchParams.get('code') || '');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.get('code')) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError('Please enter a tracking code');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (trackingCode.length < 6) {
      setError('Invalid tracking code. Please check and try again.');
      setTrackingData(null);
    } else {
      const data = generateTrackingData(trackingCode);
      setTrackingData(data);
    }
    
    setIsLoading(false);
  };

  const getStatusIcon = (status: string, completed: boolean, active?: boolean) => {
    if (active) return <Truck className="w-5 h-5 text-accent animate-pulse" />;
    if (completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              Track Your Package
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Get real-time updates on your shipment status and delivery progress
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="card-elevated">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter tracking code (e.g., ST123456789)"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="h-14 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="h-14 px-8 btn-hero text-lg"
                  disabled={isLoading}
                >
                  <Search className="w-5 h-5 mr-2" />
                  {isLoading ? 'Searching...' : 'Track Package'}
                </Button>
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingData && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Package Info */}
              <div className="lg:col-span-1">
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-primary" />
                      Package Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Tracking Code</p>
                        <p className="font-mono font-semibold">{trackingData.trackingCode}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Current Status</p>
                        <p className="font-semibold text-accent">{trackingData.status}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                        <p className="font-semibold">{trackingData.estimatedDelivery}</p>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Progress</p>
                        <Progress value={trackingData.progress} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-1">{trackingData.progress}% Complete</p>
                      </div>
                    </div>
                    
                    {/* Package Details */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold mb-3">Shipment Info</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Weight:</span>
                          <span>{trackingData.package.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dimensions:</span>
                          <span>{trackingData.package.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span>{trackingData.package.service}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Barcode */}
                    <div className="mt-6 pt-6 border-t border-border text-center">
                      <p className="text-sm text-muted-foreground mb-2">Tracking Barcode</p>
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-center space-x-1 mb-2">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-1 bg-foreground ${Math.random() > 0.5 ? 'h-8' : 'h-6'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-xs font-mono">{trackingData.trackingCode}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline */}
              <div className="lg:col-span-2">
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Shipping Timeline
                    </h3>
                    
                    <div className="space-y-6">
                      {trackingData.timeline.map((item: any, index: number) => (
                        <div key={index} className="timeline-item">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(item.status, item.completed, item.active)}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h4 className={`font-semibold ${item.active ? 'text-accent' : item.completed ? 'text-green-600' : 'text-muted-foreground'}`}>
                                  {item.status}
                                </h4>
                                <span className="text-sm text-muted-foreground">{item.date}</span>
                              </div>
                              <div className="flex items-center mt-2 text-sm">
                                <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                                <span className="text-muted-foreground">{item.location}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Sender/Receiver Info */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-muted-foreground">FROM</h4>
                          <div>
                            <p className="font-semibold">{trackingData.sender.name}</p>
                            <p className="text-sm text-muted-foreground">{trackingData.sender.address}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-muted-foreground">TO</h4>
                          <div>
                            <p className="font-semibold">{trackingData.receiver.name}</p>
                            <p className="text-sm text-muted-foreground">{trackingData.receiver.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="card-elevated">
              <CardContent className="p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-lg text-muted-foreground">Searching for your package...</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default TrackingPage;