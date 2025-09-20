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
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 12 },
  title: { fontSize: 16, marginBottom: 4, fontWeight: 'bold' },
  label: { fontSize: 12, color: '#555' },
  value: { fontSize: 12, marginBottom: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});

// PDF Component
const TrackingPDF = ({ trackingData }: any) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Tracking Info</Text>
        <Text style={styles.value}>Tracking Code: {trackingData.trackingCode}</Text>
        <Text style={styles.value}>Status: {trackingData.status}</Text>
        <Text style={styles.value}>Expected Delivery: {trackingData.estimatedDelivery}</Text>
        <Text style={styles.value}>Origin: {trackingData.origin}</Text>
        <Text style={styles.value}>Destination: {trackingData.destination}</Text>
        <Text style={styles.value}>Carrier: {trackingData.carrier}</Text>
        <Text style={styles.value}>Shipment Type: {trackingData.shipmentType}</Text>
        <Text style={styles.value}>Payment Mode: {trackingData.paymentMode}</Text>
      </View>

      {/* Sender & Receiver */}
      <View style={styles.section}>
        <Text style={styles.title}>Sender</Text>
        <Text style={styles.value}>{trackingData.shipperName}</Text>
        <Text style={styles.value}>{trackingData.shipperAddress}</Text>

        <Text style={styles.title}>Receiver</Text>
        <Text style={styles.value}>{trackingData.receiverName}</Text>
        <Text style={styles.value}>{trackingData.receiverAddress}</Text>
      </View>

      {/* Packages */}
      <View style={styles.section}>
        <Text style={styles.title}>Packages</Text>
        {trackingData.packages.map((pkg: any, i: number) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <Text style={styles.label}>Piece {i + 1}</Text>
            <Text style={styles.value}>Quantity: {pkg.quantity}</Text>
            <Text style={styles.value}>Type: {pkg.pieceType}</Text>
            <Text style={styles.value}>Weight: {pkg.weight}</Text>
            <Text style={styles.value}>Dimensions: {pkg.dimensions}</Text>
            <Text style={styles.value}>Description: {pkg.description}</Text>
          </View>
        ))}
      </View>

      {/* Shipment History */}
      <View style={styles.section}>
        <Text style={styles.title}>Shipment History</Text>
        {trackingData.history.map((h: any, idx: number) => (
          <View key={idx} style={{ marginBottom: 4 }}>
            <Text style={styles.value}>
              {h.date} {h.time} - {h.status} ({h.location}) Updated by: {h.updatedBy}
            </Text>
            {h.remarks && <Text style={styles.value}>Remarks: {h.remarks}</Text>}
          </View>
        ))}
      </View>

      {/* Barcode */}
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Barcode value={trackingData.trackingCode} />
      </View>
    </Page>
  </Document>
);

// Tracking Page Component
const TrackingPage = () => {
  const [searchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState(searchParams.get('code') || '');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.get('code')) handleSearch();
  }, []);

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError('Please enter a tracking code');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`https://shipping-backend-x7fl.onrender.com/tracking/${trackingCode}`);
      if (!res.ok) throw new Error('Failed to fetch tracking data');
      const { shipment } = await res.json();
      if (!shipment) {
        setError('No data found for this tracking code.');
        setTrackingData(null);
      } else {
        // Map the full backend schema
        setTrackingData({
          ...shipment,
          trackingCode: shipment.trackingNumber,
          status: shipment.status,
          estimatedDelivery: shipment.expectedDeliveryDate,
          packages: shipment.packages || [],
          history: shipment.history || [],
        });
      }
    } catch (err) {
      console.error(err);
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

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Package</h1>
      </section>

      {/* Search */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="card-elevated">
            <CardContent className="p-8 flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter tracking code"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="h-14 text-lg flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} className="h-14 px-8 btn-hero text-lg" disabled={isLoading}>
                <Search className="w-5 h-5 mr-2" />
                {isLoading ? 'Searching...' : 'Track'}
              </Button>
            </CardContent>
            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg mt-4">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Results */}
      {trackingData && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 card-elevated">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary" /> Package Details
                </h3>
                <p>Tracking Code: {trackingData.trackingCode}</p>
                <p>Status: {trackingData.status}</p>
                <p>Estimated Delivery: {trackingData.estimatedDelivery}</p>
                <p>Origin: {trackingData.origin}</p>
                <p>Destination: {trackingData.destination}</p>

                <div className="mt-6 text-center">
                  <PDFDownloadLink
                    document={<TrackingPDF trackingData={trackingData} />}
                    fileName={`tracking-${trackingData.trackingCode}.pdf`}
                  >
                    {({ loading }) => <Button>{loading ? 'Loading PDF...' : 'Download PDF'}</Button>}
                  </PDFDownloadLink>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="lg:col-span-2 card-elevated">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" /> Shipment Timeline
                </h3>
                <div className="space-y-6">
                  {trackingData.history.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(item.status, true)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <h4 className="font-semibold">{item.status}</h4>
                          <span className="text-sm text-muted-foreground">{item.date} {item.time}</span>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span className="text-muted-foreground">{item.location}</span>
                        </div>
                        {item.remarks && <p className="text-sm text-muted-foreground mt-1">Remarks: {item.remarks}</p>}
                      </div>
                    </div>
                  ))}
                </div>
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
