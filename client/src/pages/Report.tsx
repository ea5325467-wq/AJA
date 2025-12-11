import { Header, Footer } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Report() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم إرسال البلاغ بنجاح", {
        description: "سيتم التواصل معك من قبل مركز العمليات في أقرب وقت.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-tajawal">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 mt-16 flex items-center justify-center">
        <Card className="w-full max-w-2xl border-destructive/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
          <CardHeader className="bg-destructive/5 border-b border-destructive/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-8 h-8 text-destructive animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold font-changa text-destructive">إبلاغ عن حالة طوارئ</CardTitle>
                <CardDescription>استخدم هذا النموذج للإبلاغ عن المفقودين أو الحالات الأمنية الطارئة.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input id="name" placeholder="أدخل اسمك الرباعي" required className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الجوال</Label>
                  <Input id="phone" type="tel" placeholder="05xxxxxxxx" required className="bg-background/50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">نوع البلاغ</Label>
                <Select required>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="اختر نوع الحالة الطارئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="missing">مفقود في الصحراء</SelectItem>
                    <SelectItem value="stolen">سرقة مركبة</SelectItem>
                    <SelectItem value="accident">حادث مروري خطير</SelectItem>
                    <SelectItem value="suspicious">اشتباه أمني</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">الموقع التقريبي</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input id="location" placeholder="مثال: شمال الرياض، طريق القصيم، بالقرب من..." className="pr-10 bg-background/50" />
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-2 text-xs w-full border-dashed">
                  <MapPin className="w-3 h-3 ml-1" /> تحديد موقعي الحالي تلقائياً
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">تفاصيل البلاغ</Label>
                <Textarea 
                  id="details" 
                  placeholder="يرجى وصف الحالة بدقة، وذكر أي معلومات قد تساعد فرق الإنقاذ (نوع السيارة، اللون، رقم اللوحة، آخر اتصال...)" 
                  className="min-h-[120px] bg-background/50"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-6 text-lg shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" /> جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 ml-2" /> إرسال البلاغ فوراً
                  </>
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                * تحذير: تقديم بلاغات كاذبة يعرضك للمساءلة القانونية. هذا النموذج مخصص للحالات الطارئة فقط.
              </p>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
