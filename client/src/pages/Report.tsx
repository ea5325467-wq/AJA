import { Header, Footer } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Satellite, Radio, Loader2, CheckCircle2, AlertTriangle, Car, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Report() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchResult(null);
    
    // Simulate Satellite Search
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        plate: "KSA-999",
        owner: "عبدالله محمد القحطاني",
        status: "مفقود - استغاثة SOS",
        location: "24.7238, 46.6859 (صحراء الربع الخالي)",
        speed: "0 كم/س",
        lastSignal: "منذ 30 ثانية",
        satellite: "SAT-LINK-04"
      });
      toast.success("تم تحديد موقع المركبة بنجاح", {
        description: "تم استلام إشارة من القمر الصناعي SAT-LINK-04",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-tajawal">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 mt-16 flex flex-col items-center justify-center gap-8">
        
        {/* Search Panel */}
        <Card className="w-full max-w-3xl border-primary/30 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <Satellite className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold font-changa text-primary">نظام التتبع الفضائي المباشر</CardTitle>
                <CardDescription>واجهة الاستعلام الأمني لتحديد مواقع المركبات عبر الأقمار الصناعية.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="query">بيانات البحث</Label>
                  <div className="relative">
                    <Search className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input id="query" placeholder="أدخل رقم اللوحة أو رقم الهوية..." required className="pr-10 bg-background/50 font-mono text-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">نوع البحث</Label>
                  <Select defaultValue="plate">
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plate">رقم اللوحة</SelectItem>
                      <SelectItem value="id">رقم الهوية</SelectItem>
                      <SelectItem value="chassis">رقم الهيكل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" /> جاري الاتصال بالقمر الصناعي...
                  </>
                ) : (
                  <>
                    <Radio className="w-5 h-5 ml-2" /> بدء التتبع وتحديد الموقع
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result Panel */}
        {searchResult && (
          <Card className="w-full max-w-3xl border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardHeader className="bg-green-500/5 border-b border-green-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <CardTitle className="text-xl font-bold text-green-500">تم العثور على الإشارة</CardTitle>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-mono border border-green-500/20 animate-pulse">
                  LIVE SIGNAL
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Vehicle Info */}
                <div className="space-y-4 p-4 rounded-lg bg-background/50 border border-border/50">
                  <h3 className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <Car className="w-4 h-4" /> معلومات المركبة
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">رقم اللوحة:</span>
                      <span className="font-mono font-bold text-xl">{searchResult.plate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المالك:</span>
                      <span className="font-bold">{searchResult.owner}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">الحالة:</span>
                      <span className="px-2 py-1 rounded bg-destructive/20 text-destructive text-xs font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {searchResult.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="space-y-4 p-4 rounded-lg bg-background/50 border border-border/50">
                  <h3 className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <Satellite className="w-4 h-4" /> بيانات الموقع
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الإحداثيات:</span>
                      <span className="font-mono text-xs dir-ltr">{searchResult.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">السرعة:</span>
                      <span className="font-mono font-bold">{searchResult.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">آخر إشارة:</span>
                      <span className="text-green-500 font-bold">{searchResult.lastSignal}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6 flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  عرض على الخريطة
                </Button>
                <Button variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive/10">
                  إرسال دورية إنقاذ
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

      </main>

      <Footer />
    </div>
  );
}
