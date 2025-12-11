import { Header, Footer } from "@/components/Layout";
import { MapView } from "@/components/Map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Car, Activity, MapPin, Search, Siren, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

// Types for our vehicle simulation
interface Vehicle {
  id: number;
  lat: number;
  lng: number;
  type: "police" | "civilian" | "target" | "missing";
  status: "active" | "alert" | "idle" | "moving";
  speed: number;
  heading: number;
  plate?: string;
  alertType?: string;
}

export default function Dashboard() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [key: number]: google.maps.Marker }>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [trackedVehicles, setTrackedVehicles] = useState(12450);
  
  // Initial state with more diverse scenarios
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, lat: 24.7136, lng: 46.6753, type: "police", status: "moving", speed: 45, heading: 90, plate: "DOR-112" }, // Riyadh Patrol
    { id: 2, lat: 24.7236, lng: 46.6853, type: "target", status: "alert", speed: 120, heading: 45, plate: "KSA-999", alertType: "مطلوب أمنياً" }, // Fleeing Target
    { id: 3, lat: 21.5433, lng: 39.1728, type: "civilian", status: "alert", speed: 140, heading: 180, plate: "ABC-123", alertType: "سرعة زائدة" }, // Speeding in Jeddah
    { id: 4, lat: 20.0000, lng: 50.0000, type: "missing", status: "idle", speed: 0, heading: 0, plate: "LST-404", alertType: "مفقود - SOS" }, // Empty Quarter Missing
    { id: 5, lat: 24.7150, lng: 46.6700, type: "police", status: "moving", speed: 60, heading: 270, plate: "DOR-113" }, // Another Patrol
  ]);

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles => {
        return prevVehicles.map(v => {
          // Don't move missing vehicles (they are stuck)
          if (v.type === "missing") return v;

          // Move others slightly based on heading/speed
          const moveFactor = 0.0001 * (v.speed / 50);
          const newLat = v.lat + (Math.random() - 0.5) * moveFactor;
          const newLng = v.lng + (Math.random() - 0.5) * moveFactor;
          
          // Randomly update speed
          const newSpeed = Math.max(0, Math.min(200, v.speed + (Math.random() - 0.5) * 10));

          return { ...v, lat: newLat, lng: newLng, speed: newSpeed };
        });
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Update markers on map when vehicles change
  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize InfoWindow if not exists
    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
    }

    vehicles.forEach(v => {
      const position = { lat: v.lat, lng: v.lng };
      
      // Determine icon based on type
      let iconColor = "#10b981"; // Default Green
      let scale = 6;
      
      if (v.type === "police") { iconColor = "#06b6d4"; scale = 7; } // Cyan
      if (v.type === "target") { iconColor = "#ef4444"; scale = 8; } // Red
      if (v.type === "missing") { iconColor = "#eab308"; scale = 8; } // Yellow
      if (v.status === "alert" && v.type === "civilian") { iconColor = "#f97316"; } // Orange

      // Create or update marker
      if (markersRef.current[v.id]) {
        markersRef.current[v.id].setPosition(position);
      } else {
        const marker = new google.maps.Marker({
          position,
          map: mapRef.current,
          title: `${v.type.toUpperCase()} - ${v.plate}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: scale,
            fillColor: iconColor,
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
        });
        
        // Add click listener to open InfoWindow
        marker.addListener("click", () => {
          const contentString = `
            <div style="direction: rtl; text-align: right; font-family: 'Tajawal', sans-serif; color: #333; padding: 5px;">
              <h3 style="margin: 0 0 5px 0; font-weight: bold; color: #000;">${v.plate}</h3>
              <div style="font-size: 12px; margin-bottom: 5px;">
                <strong>الحالة:</strong> ${v.alertType || "نشط"}<br>
                <strong>السرعة:</strong> ${Math.round(v.speed)} كم/س
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=${v.lat},${v.lng}" target="_blank" style="display: inline-block; background-color: #0ea5e9; color: white; text-decoration: none; padding: 4px 8px; border-radius: 4px; font-size: 11px;">
                فتح في خرائط جوجل
              </a>
            </div>
          `;
          
          infoWindowRef.current?.setContent(contentString);
          infoWindowRef.current?.open(mapRef.current, marker);
        });

        markersRef.current[v.id] = marker;
      }
    });
  }, [vehicles]);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // Function to focus map on specific vehicle type
  const focusOnVehicleType = (type: string) => {
    if (!mapRef.current) return;

    const targetVehicle = vehicles.find(v => v.type === type || (type === "alert" && v.status === "alert"));
    
    if (targetVehicle) {
      mapRef.current.panTo({ lat: targetVehicle.lat, lng: targetVehicle.lng });
      mapRef.current.setZoom(15);
      
      // Trigger click on the marker to open InfoWindow
      if (markersRef.current[targetVehicle.id]) {
        google.maps.event.trigger(markersRef.current[targetVehicle.id], 'click');
      }
      
      toast.info(`تم تحديد موقع: ${targetVehicle.alertType || targetVehicle.plate}`);
    } else {
      toast.error("لا توجد مركبات من هذا النوع حالياً");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-tajawal">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-changa text-primary flex items-center gap-3">
              <Activity className="w-8 h-8 animate-pulse text-primary" />
              غرفة العمليات المركزية
            </h1>
            <p className="text-muted-foreground">نظام التتبع والمحاكاة الحية - V 2.0</p>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" className="gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse">
              <Siren className="w-4 h-4" />
              <span>حالة طوارئ نشطة</span>
            </Button>
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
              <Activity className="w-4 h-4" />
              <span>تحديث: {new Date().toLocaleTimeString()}</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid - Now Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Car className="w-8 h-8 text-primary" />}
            title="المركبات المتصلة"
            value={trackedVehicles.toLocaleString()}
            trend="+12% هذا الأسبوع"
            onClick={() => focusOnVehicleType("police")}
          />
          <StatCard 
            icon={<AlertTriangle className="w-8 h-8 text-orange-500" />}
            title="مخالفات السرعة"
            value="142"
            trend="رصد حي"
            trendColor="text-orange-500"
            onClick={() => focusOnVehicleType("alert")}
          />
          <StatCard 
            icon={<Shield className="w-8 h-8 text-destructive" />}
            title="مطلوبين أمنياً"
            value="1"
            trend="جاري التتبع..."
            trendColor="text-destructive animate-pulse"
            onClick={() => focusOnVehicleType("target")}
            className="cursor-pointer hover:bg-destructive/10 border-destructive/30"
          />
          <StatCard 
            icon={<MapPin className="w-8 h-8 text-yellow-500" />}
            title="مفقودين بالصحراء"
            value="1"
            trend="تم تحديد الموقع"
            trendColor="text-yellow-500"
            onClick={() => focusOnVehicleType("missing")}
            className="cursor-pointer hover:bg-yellow-500/10 border-yellow-500/30"
          />
        </div>

        {/* Main Content: Map & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Map Section */}
          <Card className="lg:col-span-2 border-primary/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] overflow-hidden flex flex-col">
            <CardHeader className="bg-card/50 border-b border-border pb-4">
              <CardTitle className="flex justify-between items-center font-changa">
                <span>الخريطة الحية</span>
                <div className="flex gap-4 text-sm font-normal">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span> دوريات</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> مطلوب</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></span> مفقود</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> مخالفة</span>
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
              
              {/* Live Feed Overlay */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-primary/30 p-3 rounded text-xs font-mono text-primary space-y-1 w-48">
                <div className="flex justify-between"><span>SAT-LINK:</span> <span className="text-emerald-500">CONNECTED</span></div>
                <div className="flex justify-between"><span>LATENCY:</span> <span>24ms</span></div>
                <div className="flex justify-between"><span>ENCRYPTION:</span> <span className="text-emerald-500">AES-256</span></div>
              </div>
            </div>
          </Card>

          {/* Sidebar: Recent Alerts & Quick Actions */}
          <div className="flex flex-col gap-4 h-full overflow-hidden">
            <Card className="flex-1 border-primary/20 bg-card/30 flex flex-col overflow-hidden">
              <CardHeader>
                <CardTitle className="font-changa text-lg text-destructive flex items-center gap-2">
                  <Siren className="w-5 h-5 animate-pulse" />
                  سجل العمليات الحي
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {vehicles.filter(v => v.status === "alert" || v.type === "missing" || v.type === "target").map(v => (
                  <AlertItem 
                    key={v.id}
                    type={v.alertType || "تنبيه"}
                    location={`${v.lat.toFixed(4)}, ${v.lng.toFixed(4)}`}
                    time="الآن"
                    severity={v.type === "target" || v.type === "missing" ? "critical" : "high"}
                    plate={v.plate}
                    speed={v.speed}
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.panTo({ lat: v.lat, lng: v.lng });
                        mapRef.current.setZoom(15);
                        // Trigger click on marker
                        if (markersRef.current[v.id]) {
                          google.maps.event.trigger(markersRef.current[v.id], 'click');
                        }
                      }
                    }}
                  />
                ))}
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
                <CardTitle className="font-changa text-lg text-primary">أوامر التحكم</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/20 text-xs">
                  <Search className="w-3 h-3" /> مسح المنطقة
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-destructive/50 text-destructive hover:bg-destructive/20 text-xs">
                  <Shield className="w-3 h-3" /> تعطيل المحرك
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-primary/50 hover:bg-primary/20 text-xs">
                  <Activity className="w-3 h-3" /> تقرير مفصل
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20 text-xs">
                  <Siren className="w-3 h-3" /> إرسال دورية
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

function StatCard({ icon, title, value, trend, trendColor = "text-primary", onClick, className }: any) {
  return (
    <Card 
      className={`bg-card/50 border-primary/10 hover:border-primary/40 transition-all active:scale-95 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
          <span className={`text-xs font-bold ${trendColor} bg-background/50 px-2 py-1 rounded`}>{trend}</span>
        </div>
        <div className="text-3xl font-bold font-changa mb-1">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-xs text-primary mt-2 opacity-0 hover:opacity-100 transition-opacity">انقر لتحديد الموقع</div>
      </CardContent>
    </Card>
  );
}

function AlertItem({ type, location, time, severity, plate, speed, onClick }: any) {
  const colors = {
    critical: "border-l-4 border-l-red-600 bg-red-500/10 animate-pulse",
    high: "border-l-4 border-l-orange-500 bg-orange-500/10",
    medium: "border-l-4 border-l-yellow-500 bg-yellow-500/10",
  };
  
  return (
    <div 
      className={`p-3 rounded-r-md ${colors[severity as keyof typeof colors]} flex justify-between items-start cursor-pointer hover:bg-white/5 transition-colors`}
      onClick={onClick}
    >
      <div>
        <div className="font-bold text-sm mb-1 flex items-center gap-2">
          {type}
          {plate && <span className="text-xs bg-background/50 px-1 rounded font-mono">{plate}</span>}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {location}
        </div>
        {speed > 0 && <div className="text-xs text-destructive font-bold mt-1">السرعة: {Math.round(speed)} كم/س</div>}
      </div>
      <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">{time}</span>
    </div>
  );
}
