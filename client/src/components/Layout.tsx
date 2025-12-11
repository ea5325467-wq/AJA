import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Satellite, Car, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Shield className="w-8 h-8 text-primary animate-pulse" />
            <span className="text-2xl font-bold font-changa text-foreground tracking-wider">عين الصقر</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/"><span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer font-tajawal">الرئيسية</span></Link>
          <Link href="/features"><span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer font-tajawal">المميزات</span></Link>
          <Link href="/dashboard"><span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer font-tajawal">لوحة التحكم</span></Link>
          <Link href="/contact"><span className="text-foreground/80 hover:text-primary transition-colors cursor-pointer font-tajawal">اتصل بنا</span></Link>
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            تسجيل الدخول
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border p-4 flex flex-col gap-4">
          <Link href="/"><span className="block py-2 text-foreground/80 hover:text-primary cursor-pointer font-tajawal">الرئيسية</span></Link>
          <Link href="/features"><span className="block py-2 text-foreground/80 hover:text-primary cursor-pointer font-tajawal">المميزات</span></Link>
          <Link href="/dashboard"><span className="block py-2 text-foreground/80 hover:text-primary cursor-pointer font-tajawal">لوحة التحكم</span></Link>
          <Link href="/contact"><span className="block py-2 text-foreground/80 hover:text-primary cursor-pointer font-tajawal">اتصل بنا</span></Link>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            تسجيل الدخول
          </Button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-changa">عين الصقر</span>
            </div>
            <p className="text-muted-foreground text-sm font-tajawal">
              نظام وطني متكامل لتتبع المركبات وتعزيز الأمن المروري باستخدام أحدث تقنيات الأقمار الصناعية.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 font-changa text-primary">روابط سريعة</h3>
            <ul className="space-y-2 text-sm font-tajawal">
              <li><Link href="/"><span className="text-muted-foreground hover:text-primary cursor-pointer">الرئيسية</span></Link></li>
              <li><Link href="/features"><span className="text-muted-foreground hover:text-primary cursor-pointer">المميزات</span></Link></li>
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary cursor-pointer">عن النظام</span></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 font-changa text-primary">الخدمات</h3>
            <ul className="space-y-2 text-sm font-tajawal">
              <li><span className="text-muted-foreground">تتبع المركبات</span></li>
              <li><span className="text-muted-foreground">الإنقاذ الصحراوي</span></li>
              <li><span className="text-muted-foreground">الأمن المروري</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 font-changa text-primary">تواصل معنا</h3>
            <ul className="space-y-2 text-sm font-tajawal">
              <li><span className="text-muted-foreground">الرياض، المملكة العربية السعودية</span></li>
              <li><span className="text-muted-foreground">info@eagleeye.sa</span></li>
              <li><span className="text-muted-foreground">911</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground font-tajawal">
          © {new Date().getFullYear()} نظام عين الصقر. جميع الحقوق محفوظة لوزارة الداخلية.
        </div>
      </div>
    </footer>
  );
}
