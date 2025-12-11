import { Header, Footer } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Cpu, Satellite, ShieldCheck, Wifi } from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-tajawal">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 mt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-changa text-primary mb-6">المواصفات الفنية للنظام</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            تعرف على التقنيات المتقدمة التي تجعل من "عين الصقر" النظام الأكثر تطوراً في المنطقة.
          </p>
        </div>

        <Tabs defaultValue="hardware" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/50 p-1 h-auto">
            <TabsTrigger value="hardware" className="py-4 text-lg font-changa data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Cpu className="w-5 h-5 ml-2" /> وحدة التتبع (VTS)
            </TabsTrigger>
            <TabsTrigger value="connectivity" className="py-4 text-lg font-changa data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Satellite className="w-5 h-5 ml-2" /> الاتصال والشبكات
            </TabsTrigger>
            <TabsTrigger value="security" className="py-4 text-lg font-changa data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShieldCheck className="w-5 h-5 ml-2" /> الأمان والتشفير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hardware" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <img src="/images/tracking-chip.png" alt="VTS Hardware" className="relative rounded-lg shadow-2xl w-full" />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-changa text-primary">وحدة المعالجة المركزية المتطورة</h3>
                <p className="text-muted-foreground leading-relaxed">
                  تم تصميم وحدة VTS بمعالجات رباعية النواة منخفضة الطاقة لضمان أداء مستمر دون استنزاف بطارية المركبة. تحتوي الوحدة على ذاكرة تخزين داخلية لحفظ البيانات في حال انقطاع الاتصال المؤقت.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <SpecItem title="المعالج" value="Quad-Core ARM Cortex-A53" />
                  <SpecItem title="الذاكرة" value="4GB LPDDR4 RAM" />
                  <SpecItem title="التخزين" value="64GB eMMC (Blackbox Mode)" />
                  <SpecItem title="البطارية الاحتياطية" value="5000mAh (تعمل لمدة 72 ساعة)" />
                  <SpecItem title="مقاومة العوامل الجوية" value="IP68 (مقاوم للماء والغبار والحرارة العالية)" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connectivity" className="space-y-8">
            <Card className="bg-card/30 border-primary/20">
              <CardHeader>
                <CardTitle className="font-changa text-2xl text-primary flex items-center gap-2">
                  <Satellite className="w-6 h-6" /> نظام الاتصال الهجين (Hybrid Connectivity)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  يتميز نظام عين الصقر بقدرته الفريدة على التبديل التلقائي بين شبكات الجوال الأرضية والأقمار الصناعية لضمان اتصال لا ينقطع بنسبة 99.9%.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-background/50 rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Wifi className="w-8 h-8 text-emerald-500" />
                      <h4 className="text-xl font-bold">الشبكات الأرضية (4G/5G)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• سرعة نقل بيانات عالية</li>
                      <li>• زمن استجابة منخفض (Low Latency)</li>
                      <li>• التكلفة التشغيلية المنخفضة</li>
                      <li>• تغطية المدن والطرق الرئيسية</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-background/50 rounded-lg border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <Satellite className="w-8 h-8 text-cyan-500" />
                      <h4 className="text-xl font-bold">الأقمار الصناعية (LEO Satellites)</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• تغطية شاملة للصحاري والمناطق النائية</li>
                      <li>• إرسال إشارات الاستغاثة (SOS)</li>
                      <li>• تحديد الموقع بدقة عالية (GNSS)</li>
                      <li>• يعمل كنسخة احتياطية عند انقطاع الشبكة</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SecurityCard 
                title="تشفير عسكري" 
                desc="جميع البيانات المرسلة والمستقبلة مشفرة بمعيار AES-256 لضمان عدم اختراقها."
              />
              <SecurityCard 
                title="شبكة خاصة (VPN)" 
                desc="تعمل الوحدات ضمن شبكة افتراضية خاصة معزولة عن الإنترنت العام."
              />
              <SecurityCard 
                title="كشف التلاعب" 
                desc="مستشعرات خاصة تطلق إنذاراً فورياً عند محاولة فك أو تخريب الجهاز."
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

function SpecItem({ title, value }: { title: string, value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-card/50 rounded border border-border hover:border-primary/50 transition-colors">
      <span className="font-bold text-foreground/80">{title}</span>
      <Badge variant="outline" className="text-primary border-primary/30 font-mono text-sm">{value}</Badge>
    </div>
  );
}

function SecurityCard({ title, desc }: { title: string, desc: string }) {
  return (
    <Card className="bg-card/30 border-primary/20 hover:border-primary/60 transition-all hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-changa text-xl text-primary flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
