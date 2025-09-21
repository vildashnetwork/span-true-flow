// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import Barcode from 'react-barcode';
// import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// // PDF Styles
// const styles = StyleSheet.create({
//   page: { padding: 20 },
//   section: { marginBottom: 10 },
// });

// const TrackingPDF = ({ trackingData }: any) => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.section}>
//         <Text>Tracking Code: {trackingData.trackingCode}</Text>
//         <Text>Status: {trackingData.status}</Text>
//         <Text>Estimated Delivery: {trackingData.estimatedDelivery}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Sender: {trackingData.sender.name}</Text>
//         <Text>Address: {trackingData.sender.address}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Receiver: {trackingData.receiver.name}</Text>
//         <Text>Address: {trackingData.receiver.address}</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Package Info:</Text>
//         <Text>Weight: {trackingData.package.weight}</Text>
//         <Text>Dimensions: {trackingData.package.dimensions}</Text>
//         <Text>Service: {trackingData.package.service}</Text>
//         <Text>Value: {trackingData.package.value}</Text>
//       </View>
//     </Page>
//   </Document>
// );

// const TrackingPage = () => {
//   const [searchParams] = useSearchParams();
//   const [trackingCode, setTrackingCode] = useState(searchParams.get('code') || '');
//   const [trackingData, setTrackingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (searchParams.get('code')) {
//       handleSearch();
//     }
//   }, []);

//   const handleSearch = async () => {
//     if (!trackingCode.trim()) {
//       setError('Please enter a tracking code');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       const res = await fetch(`https://shipping-backend-x7fl.onrender.com/tracking/${trackingCode}`);
//       if (!res.ok) throw new Error('Failed to fetch tracking data');
//       const { shipment } = await res.json();

//       if (!shipment) {
//         setError('No data found for this tracking code.');
//         setTrackingData(null);
//       } else {
//         // Map backend fields to frontend expected structure
//         const mappedData = {
//           trackingCode: shipment.trackingNumber,
//           status: shipment.status,
//           estimatedDelivery: shipment.expectedDeliveryDate,
//           progress: shipment.progress || 0,
//           package: {
//             weight: shipment.weight,
//             dimensions: shipment.dimensions,
//             service: shipment.shipmentType,
//             value: shipment.value || '-',
//           },
//           sender: {
//             name: shipment.shipperName,
//             address: shipment.shipperAddress,
//           },
//           receiver: {
//             name: shipment.receiverName,
//             address: shipment.receiverAddress,
//           },
//           timeline: shipment.history?.map((h: any) => ({
//             status: h.status,
//             completed: h.completed || false,
//             active: h.active || false,
//             date: h.date,
//             location: h.location,
//             description: h.remarks || '',
//           })) || [],
//         };

//         setTrackingData(mappedData);
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Error fetching tracking data. Please try again later.');
//       setTrackingData(null);
//     }

//     setIsLoading(false);
//   };

//   const getStatusIcon = (status: string, completed: boolean, active?: boolean) => {
//     if (active) return <Truck className="w-5 h-5 text-accent animate-pulse" />;
//     if (completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
//     return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />;
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       {/* Hero Section */}
//       <section className="pt-32 pb-16 bg-gradient-hero text-white text-center">
//         <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Package</h1>
//         <p className="text-xl text-gray-200 max-w-2xl mx-auto">
//           Get real-time updates on your shipment status and delivery progress
//         </p>
//       </section>

//       {/* Search Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <Card className="card-elevated">
//             <CardContent className="p-8 flex flex-col md:flex-row gap-4">
//               <Input
//                 type="text"
//                 placeholder="Enter tracking code (e.g., ST123456789)"
//                 value={trackingCode}
//                 onChange={(e) => setTrackingCode(e.target.value)}
//                 className="h-14 text-lg flex-1"
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />
//               <Button onClick={handleSearch} className="h-14 px-8 btn-hero text-lg" disabled={isLoading}>
//                 <Search className="w-5 h-5 mr-2" />
//                 {isLoading ? 'Searching...' : 'Track Package'}
//               </Button>
//             </CardContent>
//             {error && (
//               <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg mt-4">
//                 <AlertCircle className="w-5 h-5" />
//                 <span>{error}</span>
//               </div>
//             )}
//           </Card>
//         </div>
//       </section>

//       {/* Tracking Results */}
//       {trackingData && (
//         <section className="pb-16">
//           <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Package Info */}
//             <Card className="lg:col-span-1 card-elevated">
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold mb-4 flex items-center">
//                   <Package className="w-5 h-5 mr-2 text-primary" /> Package Details
//                 </h3>
//                 <p className="text-sm text-muted-foreground">Tracking Code</p>
//                 <p className="font-mono font-semibold">{trackingData.trackingCode}</p>

//                 <p className="text-sm text-muted-foreground mt-2">Current Status</p>
//                 <p className="font-semibold text-accent">{trackingData.status}</p>

//                 <p className="text-sm text-muted-foreground mt-2">Estimated Delivery</p>
//                 <p className="font-semibold">{trackingData.estimatedDelivery}</p>

//                 <div className="pt-4 border-t border-border">
//                   <p className="text-sm text-muted-foreground mb-2">Progress</p>
//                   <Progress value={trackingData.progress} className="h-3" />
//                   <p className="text-xs text-muted-foreground mt-1">{trackingData.progress}% Complete</p>
//                 </div>

//                 {/* Package Details */}
//                 <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Weight:</span>
//                     <span>{trackingData.package.weight}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Dimensions:</span>
//                     <span>{trackingData.package.dimensions}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Service:</span>
//                     <span>{trackingData.package.service}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Value:</span>
//                     <span>{trackingData.package.value}</span>
//                   </div>
//                 </div>

//                 {/* Barcode */}
//                 <div className="mt-6 pt-6 border-t border-border text-center">
//                   <p className="text-sm text-muted-foreground mb-2">Tracking Barcode</p>
//                   <Barcode value={trackingData.trackingCode} />
//                 </div>

//                 {/* PDF Download */}
//                 <div className="mt-6 text-center">
//                   <PDFDownloadLink
//                     document={<TrackingPDF trackingData={trackingData} />}
//                     fileName={`tracking-${trackingData.trackingCode}.pdf`}
//                   >
//                     {({ loading }) => (
//                       <Button>{loading ? 'Loading PDF...' : 'Download PDF'}</Button>
//                     )}
//                   </PDFDownloadLink>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Timeline */}
//             <Card className="lg:col-span-2 card-elevated">
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-semibold mb-6 flex items-center">
//                   <Clock className="w-5 h-5 mr-2 text-primary" /> Shipping Timeline
//                 </h3>
//                 <div className="space-y-6">
//                   {trackingData.timeline.map((item: any, idx: number) => (
//                     <div key={idx} className="flex items-start gap-4">
//                       <div className="flex-shrink-0 mt-1">
//                         {getStatusIcon(item.status, item.completed, item.active)}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                           <h4 className={`font-semibold ${item.active ? 'text-accent' : item.completed ? 'text-green-600' : 'text-muted-foreground'}`}>
//                             {item.status}
//                           </h4>
//                           <span className="text-sm text-muted-foreground">{item.date}</span>
//                         </div>
//                         <div className="flex items-center mt-2 text-sm">
//                           <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
//                           <span className="text-muted-foreground">{item.location}</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </section>
//       )}

//       {isLoading && (
//         <section className="pb-16">
//           <div className="container mx-auto px-4 max-w-4xl">
//             <Card className="card-elevated text-center p-12">
//               <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//               <p className="text-lg text-muted-foreground">Searching for your package...</p>
//             </Card>
//           </div>
//         </section>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default TrackingPage;




import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

const TrackingPage = () => {
  const [searchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState(
    searchParams.get('code') || ''
  );
  const [shipment, setShipment] = useState(null); // will hold the shipment object
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If the URL contains ?code=..., auto-run a search
    const codeFromParam = searchParams.get('code');
    if (codeFromParam) {
      setTrackingCode(codeFromParam);
      handleSearch(codeFromParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (overrideCode) => {
    const code = overrideCode ?? trackingCode;
    if (!code || !code.trim()) {
      setError('Please enter a tracking code');
      return;
    }

    setIsLoading(true);
    setError('');
    setShipment(null);

    try {
      const res = await axios.get(
        `https://shipping-backend-x7fl.onrender.com/tracking/${code}`
      );

      // your backend returns { shipment: { ... } }
      if (!res.data || !res.data.shipment) {
        setError('No data found for this tracking code.');
        setShipment(null);
      } else {
        setShipment(res.data.shipment);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching tracking data. Please try again later.');
      setShipment(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status, completed, active) => {
    if (active) return <Truck className="w-5 h-5 text-accent animate-pulse" />;
    if (completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return (
      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
    );
  };

  // PDF download URL (encoded)
  const pdfUrl =
    shipment?.trackingNumber
      ? `https://shipping-backend-x7fl.onrender.com/tracking/${encodeURIComponent(
        shipment.trackingNumber
      )}/pdf`
      : trackingCode
        ? `https://shipping-backend-x7fl.onrender.com/tracking/${encodeURIComponent(
          trackingCode
        )}/pdf`
        : '';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Track Your Package</h1>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Get real-time updates on your shipment status and delivery progress
        </p>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="card-elevated">
            <CardContent className="p-8 flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter tracking code (e.g., WPC8197-CARGO199)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="h-14 text-lg flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={() => handleSearch()}
                className="h-14 px-8 btn-hero text-lg"
                disabled={isLoading}
              >
                <Search className="w-5 h-5 mr-2" />
                {isLoading ? 'Searching...' : 'Track Package'}
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

      {/* Tracking Results */}
      {shipment && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipment Info */}
            <Card className="lg:col-span-1 card-elevated">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary" /> Shipment Details
                </h3>

                <p className="text-sm text-muted-foreground mt-2">Tracking Number</p>
                <p className="font-mono font-semibold">{shipment.trackingNumber}</p>

                <p className="text-sm text-muted-foreground mt-2">Status</p>
                <p className="font-semibold text-accent">{shipment.status}</p>

                <p className="text-sm text-muted-foreground mt-2">Expected Delivery</p>
                <p className="font-semibold">{shipment.expectedDeliveryDate}</p>

                <div className="mt-4 space-y-1">
                  <p className="text-sm text-muted-foreground">Shipper</p>
                  <p>{shipment.shipperName}</p>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{shipment.shipperAddress}</p>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-muted-foreground">Receiver</p>
                  <p>{shipment.receiverName}</p>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{shipment.receiverAddress}</p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Origin</p>
                    <p>{shipment.origin}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Destination</p>
                    <p>{shipment.destination}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carrier</p>
                    <p>{shipment.carrier}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Shipment Type</p>
                    <p>{shipment.shipmentType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Package Count</p>
                    <p>{shipment.packageCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Weight</p>
                    <p>{shipment.weight}</p>
                  </div>
                </div>

                {/* Packages */}
                {shipment.packages?.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="font-semibold mb-2">Packages</h4>
                    {shipment.packages.map((pkg, idx) => (
                      <div key={pkg._id ?? idx} className="text-sm mb-2">
                        <p>
                          <strong>Package {idx + 1}:</strong> {pkg.description}
                        </p>
                        <p>
                          Quantity: {pkg.quantity}, Type: {pkg.pieceType}
                        </p>
                        <p>
                          Weight: {pkg.weight} kg, Dimensions: {pkg.dimensions}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Extra fields (payment, freight, refs) */}
                <div className="mt-6 pt-4 border-t border-border text-sm">
                  <p className="text-muted-foreground">Payment Mode</p>
                  <p>{shipment.paymentMode}</p>

                  <p className="text-muted-foreground mt-2">Freight Cost</p>
                  <p>{shipment.freightCost}</p>

                  <p className="text-muted-foreground mt-2">Carrier Reference No.</p>
                  <p>{shipment.carrierReferenceNo}</p>

                  <p className="text-muted-foreground mt-2">Product</p>
                  <p>
                    {shipment.productName} — Quantity: {shipment.quantity}
                  </p>

                  <p className="text-muted-foreground mt-2">Pickup</p>
                  <p>
                    {shipment.pickupDate} {shipment.pickupTime}
                  </p>

                  <p className="text-muted-foreground mt-2">Departure Time</p>
                  <p>{shipment.departureTime}</p>

                  <p className="text-muted-foreground mt-2">Comments</p>
                  <p>{shipment.comments}</p>
                </div>

                {/* Barcode + QR Code */}
                <div className="mt-6 pt-6 border-t border-border text-center space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Scan to open PDF / Download
                  </p>

                  {/* QR code (mobile-friendly scan) */}
                  {pdfUrl && (
                    <div className="inline-block bg-white p-4 rounded-md">
                      <QRCode value={pdfUrl} size={128} />
                    </div>
                  )}

                  {/* 1D barcode (visual / printable) */}
                  <div className="mt-4">
                    <Barcode
                      value={shipment.trackingNumber}
                      displayValue={true}
                      format="CODE128"
                      height={60}
                      width={1.5}
                    />
                  </div>

                  {/* Direct PDF download */}
                  <div className="mt-4">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>Open / Download PDF</Button>
                    </a>
                  </div>
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
                  {shipment.history?.length > 0 ? (
                    shipment.history.map((item, idx) => (
                      <div key={item._id ?? idx} className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(item.status, item.completed || false, item.active || false)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h4
                              className={`font-semibold ${item.active ? 'text-accent' : item.completed ? 'text-green-600' : 'text-muted-foreground'}`}
                            >
                              {item.status}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              {item.date} {item.time}
                            </span>
                          </div>
                          <div className="flex items-center mt-2 text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{item.location}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.remarks}</p>
                          <p className="text-xs text-muted-foreground mt-1">Updated by: {item.updatedBy}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No history available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="card-elevated text-center p-12">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">
                Searching for your package...
              </p>
            </Card>
          </div>
        </section>
      )}

      
      <Footer />
    </div>
  );
};

export default TrackingPage;
