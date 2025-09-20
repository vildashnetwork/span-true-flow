import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Barcode from 'react-barcode';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
});

// PDF component
const TrackingPDF = ({ trackingData }: any) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Tracking Code: {trackingData.trackingCode}</Text>
        <Text>Status: {trackingData.status}</Text>
        <Text>Estimated Delivery: {trackingData.estimatedDelivery}</Text>
      </View>
      <View style={styles.section}>
        <Text>Sender: {trackingData.sender.name}</Text>
        <Text>Address: {trackingData.sender.address}</Text>
      </View>
      <View style={styles.section}>
        <Text>Receiver: {trackingData.receiver.name}</Text>
        <Text>Address: {trackingData.receiver.address}</Text>
      </View>
    </Page>
  </Document>
);

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

    try {
      const response = await fetch(`https://shipping-backend-x7fl.onrender.com/tracking?code=${trackingCode}`);
      if (!response.ok) throw new Error('Failed to fetch tracking data');
      const data = await response.json();
      if (!data || !data.trackingCode) {
        setError('Invalid tracking code. Please check and try again.');
        setTrackingData(null);
      } else {
        setTrackingData(data);
      }
    } catch (err) {
      setError('Error fetching tracking data. Please try again later.');
      setTrackingData(null);
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Package</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Get real-time updates on your shipment status and delivery progress
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="card-elevated">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  type="text"
                  placeholder="Enter tracking code (e.g., ST123456789)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="h-14 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} className="h-14 px-8 btn-hero text-lg" disabled={isLoading}>
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
          <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Info */}
            <Card className="lg:col-span-1 card-elevated">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary" /> Package Details
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Tracking Code</p>
                  <p className="font-mono font-semibold">{trackingData.trackingCode}</p>

                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <p className="font-semibold text-accent">{trackingData.status}</p>

                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-semibold">{trackingData.estimatedDelivery}</p>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Progress</p>
                    <Progress value={trackingData.progress} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">{trackingData.progress}% Complete</p>
                  </div>
                </div>

                {/* Barcode */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">Tracking Barcode</p>
                  <Barcode value={trackingData.trackingCode} />
                </div>

                {/* PDF Download */}
                <div className="mt-6 text-center">
                  <PDFDownloadLink
                    document={<TrackingPDF trackingData={trackingData} />}
                    fileName={`tracking-${trackingData.trackingCode}.pdf`}
                  >
                    {({ loading }) => (
                      <Button>{loading ? 'Loading PDF...' : 'Download PDF'}</Button>
                    )}
                  </PDFDownloadLink>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="lg:col-span-2 card-elevated">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" /> Shipping Timeline
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
                            <h4
                              className={`font-semibold ${
                                item.active ? 'text-accent' : item.completed ? 'text-green-600' : 'text-muted-foreground'
                              }`}
                            >
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
                <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-muted-foreground">FROM</h4>
                    <p className="font-semibold">{trackingData.sender.name}</p>
                    <p className="text-sm text-muted-foreground">{trackingData.sender.address}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-muted-foreground">TO</h4>
                    <p className="font-semibold">{trackingData.receiver.name}</p>
                    <p className="text-sm text-muted-foreground">{trackingData.receiver.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

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
