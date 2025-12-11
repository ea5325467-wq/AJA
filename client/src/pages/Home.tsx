import { Header, Footer } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Shield, Car, MapPin, AlertTriangle, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-tajawal overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Digital Command Center" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-changa mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              نظام عين الصقر
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              الجيل القادم من أنظمة الأمن المروري وتتبع المركبات عبر الأقمار الصناعية.
              <br />
              <span className="text-primary font-bold">أمان شامل. استجابة فورية. تغطية لا تنقطع.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-none border border-primary/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all w-full sm:w-auto">
                  استكشف النظام
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 rounded-none backdrop-blur-sm w-full sm:w-auto">
                  تسجيل الدخول للجهات الأمنية
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-changa mb-4 text-primary">ركائز النظام</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تقنيات متقدمة تعمل بتناغم لتوفير أقصى درجات الأمان والسلامة على طرق المملكة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Satellite className="w-12 h-12 text-primary" />}
              title="تغطية فضائية شاملة"
              description="اتصال مزدوج عبر الأقمار الصناعية وشبكات الجوال لضمان التتبع في أبعد المناطق الصحراوية."
              image="/images/satellite-view.png"
            />
            <FeatureCard 
              icon={<Search className="w-12 h-12 text-destructive" />}
              title="الإنقاذ والبحث"
              description="تحديد مواقع المفقودين في الصحراء بدقة متناهية، مما يقلص زمن الاستجابة لفرق الإنقاذ."
              image="/images/desert-rescue.png"
            />
            <FeatureCard 
              icon={<Shield className="w-12 h-12 text-emerald-400" />}
              title="الأمن الجنائي"
              description="تتبع المركبات المسروقة والمطلوبة أمنياً بشكل فوري، مع إمكانية التعطيل عن بعد."
              image="/images/tracking-chip.png"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem number="100%" label="تغطية جغرافية" />
            <StatItem number="< 3 د" label="زمن استجابة الطوارئ" />
            <StatItem number="24/7" label="مراقبة مستمرة" />
            <StatItem number="0" label="مناطق معزولة" />
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold font-changa text-primary">تقنية VTS الذكية</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                وحدة التتبع الذكية (Vehicle Tracking Unit) هي قلب نظام عين الصقر. شريحة إلكترونية متطورة تدمج بين:
              </p>
              <ul className="space-y-4">
                <ListItem text="مستقبل GPS عالي الدقة لتحديد الموقع." />
                <ListItem text="مودم اتصال فضائي (Satellite Link) للمناطق النائية." />
                <ListItem text="مستشعرات لرصد السرعة، الاصطدام، وحزام الأمان." />
                <ListItem text="نظام تشفير عسكري لحماية البيانات." />
              </ul>
              <Button className="mt-8 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                المواصفات الفنية الكاملة
              </Button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="/images/tracking-chip.png" 
                alt="VTS Chip" 
                className="relative rounded-lg shadow-2xl border border-primary/20 w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description, image }: { icon: React.ReactNode, title: string, description: string, image: string }) {
  return (
    <Card className="bg-card/50 border-primary/20 overflow-hidden group hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-300"></div>
        <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
      </div>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="font-changa text-xl text-foreground group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div className="p-6">
      <div className="text-4xl md:text-5xl font-bold font-changa text-primary mb-2">{number}</div>
      <div className="text-muted-foreground font-tajawal">{label}</div>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]"></div>
      <span className="text-foreground/90">{text}</span>
    </li>
  );
}
