import { Header, Footer } from "@/components/Layout";
import { MapView } from "@/components/Map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Car, Activity, MapPin, Search } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [trackedVehicles, setTrackedVehicles] = useState(12450);

  // Mock data for map markers
  const mockVehicles = [
    { id: 1, lat: 24.7136, lng: 46.6753, type: "police", status: "active" }, // Riyadh
    { id: 2, lat: 21.5433, lng: 39.1728, type: "civilian", status: "alert" }, // Jeddah
    { id: 3, lat: 26.4207, lng: 50.0888, type: "civilian", status: "active" }, // Dammam
    { id: 4, lat: 24.4672, lng: 39.6112, type: "police", status: "idle" }, // Madinah
  ];

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;

    // Add markers for mock vehicles
    mockVehicles.forEach((vehicle) => {
      const markerColor = vehicle.status === "alert" ? "#ef4444" : vehicle.type === "police" ? "#06b6d4" : "#10b981";
      
      // Using AdvancedMarkerElement if available, or fallback to standard Marker
      // Note: In a real implementation, we'd check for library availability
      new google.maps.Marker({
        position: { lat: vehicle.lat, lng: vehicle.lng },
        map: map,
        title: `Vehicle ${vehicle.id}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-tajawal">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-changa text-primary">لوحة التحكم المركزية</h1>
            <p className="text-muted-foreground">مراقبة حية لحركة المركبات والحالات الأمنية</p>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" className="gap-2 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              <span>{activeAlerts} تنبيهات نشطة</span>
            </Button>
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
              <Activity className="w-4 h-4" />
              <span>تحديث البيانات: مباشر</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Car className="w-8 h-8 text-primary" />}
            title="المركبات المتصلة"
            value={trackedVehicles.toLocaleString()}
            trend="+12% هذا الأسبوع"
          />
          <StatCard 
            icon={<AlertTriangle className="w-8 h-8 text-destructive" />}
            title="مخالفات السرعة"
            value="142"
            trend="-5% مقارنة بالأمس"
            trendColor="text-emerald-500"
          />
          <StatCard 
            icon={<Shield className="w-8 h-8 text-emerald-500" />}
            title="مركبات مطلوبة"
            value="8"
            trend="تم تحديد موقع 3"
          />
          <StatCard 
            icon={<MapPin className="w-8 h-8 text-yellow-500" />}
            title="بلاغات مفقودين"
            value="2"
            trend="جاري البحث..."
          />
        </div>

        {/* Main Content: Map & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Map Section */}
          <Card className="lg:col-span-2 border-primary/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] overflow-hidden flex flex-col">
            <CardHeader className="bg-card/50 border-b border-border pb-4">
              <CardTitle className="flex justify-between items-center font-changa">
                <span>الخريطة الحية</span>
                <div className="flex gap-2 text-sm font-normal">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyan-500"></span> دوريات</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> مدني</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> تنبيه</span>
                </div>
              </CardTitle>
            </CardHeader>
            <div className="flex-1 relative">
              <MapView 
                className="w-full h-full"
                initialCenter={{ lat: 24.7136, lng: 46.6753 }} // Riyadh Center
                initialZoom={6}
                onMapReady={handleMapReady}
              />
              {/* Overlay UI elements could go here */}
            </div>
          </Card>

          {/* Sidebar: Recent Alerts & Quick Actions */}
          <div className="flex flex-col gap-4 h-full overflow-hidden">
            <Card className="flex-1 border-primary/20 bg-card/30 flex flex-col overflow-hidden">
              <CardHeader>
                <CardTitle className="font-changa text-lg text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  آخر التنبيهات
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                <AlertItem 
                  type="سرقة" 
                  location="الرياض - حي الملز" 
                  time="منذ 5 دقائق" 
                  severity="high"
                />
                <AlertItem 
                  type="سرعة زائدة" 
                  location="طريق الدمام السريع" 
                  time="منذ 12 دقيقة" 
                  severity="medium"
                />
                <AlertItem 
                  type="استغاثة SOS" 
                  location="صحراء الربع الخالي" 
                  time="منذ 25 دقيقة" 
                  severity="critical"
                />
                <AlertItem 
                  type="حادث مروري" 
                  location="جدة - طريق الكورنيش" 
                  time="منذ 40 دقيقة" 
                  severity="high"
                />
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/30">
              <CardHeader>
                <CardTitle className="font-changa text-lg text-primary">إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/20">
                  <Search className="w-4 h-4" /> بحث عن مركبة
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/20">
                  <Shield className="w-4 h-4" /> تعميم أمني
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/20">
                  <Activity className="w-4 h-4" /> تقرير يومي
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-destructive/50 text-destructive hover:bg-destructive/20">
                  <AlertTriangle className="w-4 h-4" /> إعلان طوارئ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ icon, title, value, trend, trendColor = "text-primary" }: any) {
  return (
    <Card className="bg-card/50 border-primary/10 hover:border-primary/40 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
          <span className={`text-xs font-bold ${trendColor} bg-background/50 px-2 py-1 rounded`}>{trend}</span>
        </div>
        <div className="text-3xl font-bold font-changa mb-1">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ type, location, time, severity }: any) {
  const colors = {
    critical: "border-l-4 border-l-red-600 bg-red-500/10",
    high: "border-l-4 border-l-orange-500 bg-orange-500/10",
    medium: "border-l-4 border-l-yellow-500 bg-yellow-500/10",
  };
  
  return (
    <div className={`p-3 rounded-r-md ${colors[severity as keyof typeof colors]} flex justify-between items-start`}>
      <div>
        <div className="font-bold text-sm mb-1">{type}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {location}
        </div>
      </div>
      <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">{time}</span>
    </div>
  );
}
