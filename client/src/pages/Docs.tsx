import { Header, Footer } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Code, Shield, Cpu, Terminal } from "lucide-react";
import { Streamdown } from "streamdown";

const judgingGuide = `
# دليل الرد على لجنة التحكيم - مشروع "عين الصقر"

هذا الدليل سيساعدك على الإجابة بثقة واحترافية عندما تسألك اللجنة: **"كيف برمجت هذا المشروع؟"** أو **"كيف يعمل النظام؟"**.

---

## 1. السؤال الأهم: "كيف برمجت هذا المشروع؟" (Technical Stack)

عندما تُسأل هذا السؤال، لا تقل "استخدمت الذكاء الاصطناعي" فقط. بل اشرح **التقنيات** التي بُني عليها المشروع لتظهر فهمك العميق.

**الإجابة المقترحة:**
> "تم بناء المشروع باستخدام أحدث تقنيات الويب الحديثة لضمان السرعة والأداء العالي:
> 1. **إطار العمل (Framework):** استخدمت **React.js** لبناء واجهة مستخدم تفاعلية وسريعة الاستجابة، مما يسمح بتحديث حركة المركبات دون إعادة تحميل الصفحة.
> 2. **التصميم (Styling):** اعتمدت على **Tailwind CSS** لتصميم واجهة عصرية متجاوبة (Responsive) تعمل على جميع الشاشات، مع مكتبة **Shadcn/ui** للعناصر الجاهزة لضمان تجربة مستخدم (UX) احترافية.
> 3. **الخرائط (Maps):** قمت بدمج **Google Maps API** لعرض الخرائط الحية، واستخدمت نظام الإحداثيات (Coordinates) لرسم ومحاكاة حركة المركبات.
> 4. **لغة البرمجة:** المشروع مكتوب بـ **TypeScript** لضمان خلو الكود من الأخطاء البرمجية وسهولة صيانته مستقبلاً."

---

## 2. كيف تعمل "المحاكاة الحية"؟ (The Logic)

إذا سألو: **"كيف تتحرك السيارات على الخريطة؟ هل هذا حقيقي؟"**

**الإجابة المقترحة:**
> "ما ترونه الآن هو **نموذج محاكاة (Simulation Prototype)** لإثبات فكرة المشروع.
> برمجياً، قمت بإنشاء خوارزمية بسيطة تقوم بتحديث إحداثيات (Latitude & Longitude) المركبات كل ثانية.
> - النظام يحسب الاتجاه والسرعة لكل مركبة.
> - يقوم بتغيير موقعها تدريجياً على الخريطة ليعطي انطباع الحركة الواقعية.
> - في التطبيق الفعلي، سيتم استبدال هذه البيانات الوهمية ببيانات حقيقية تأتي من **API** مربوط بالأقمار الصناعية."

---

## 3. كيف تشرح فكرة "الشريحة الهجينة"؟ (The Concept)

إذا سألو: **"كيف تتصل السيارة بالإنترنت في الصحراء؟"**

**الإجابة المقترحة:**
> "الابتكار التقني في مشروعي يكمن في **وحدة التتبع الهجينة (Hybrid VTS Unit)**.
> برمجت النظام ليتعامل مع نوعين من الاتصال:
> 1. **شبكات 4G/5G:** داخل المدن لنقل البيانات بسرعة عالية وتكلفة منخفضة.
> 2. **الأقمار الصناعية (Satellite IoT):** عندما تخرج السيارة من تغطية الأبراج، تنتقل الشريحة تلقائياً للاتصال عبر الأقمار الصناعية (مثل شبكة Iridium أو Thuraya)، مما يضمن بقاء السيارة متصلة بنسبة 100% حتى في الربع الخالي."

---

## 4. شرح المميزات التفاعلية (The Demo)

أثناء العرض، عندما تضغط على الأزرار، اشرح ما يحدث تقنياً:

*   **عند الضغط على "مطلوب" (Filtering):**
    > "هنا استخدمت **React State Management** لفلترة مصفوفة البيانات (Data Array). النظام يقوم فوراً بإخفاء أي مركبة لا تحمل وسم 'مطلوب'، مما يساعد المشغل على التركيز."

*   **عند النقر على السيارة (Interactivity):**
    > "كل مركبة على الخريطة هي عبارة عن كائن تفاعلي (Interactive Object). عند النقر، يتم استدعاء دالة تعرض نافذة المعلومات (Info Window) وتحتوي على رابط ديناميكي يفتح موقع السيارة في تطبيق خرائط جوجل الخارجي."

---

## 5. نصائح ذهبية للعرض (Pro Tips)

1.  **كن واثقاً:** أنت "مدير المنتج" (Product Manager) لهذا النظام. أنت تعرف كيف يعمل كل جزء فيه.
2.  **التركيز على القيمة:** لا تغرق في التفاصيل التقنية إلا إذا سُئلت. ركز على **"كيف ينقذ هذا النظام الأرواح؟"**.
3.  **الاعتراف بالمحاكاة:** لا تدعي أن البيانات حقيقية. قل بوضوح: "هذه بيانات تجريبية (Demo Data) لتوضيح قدرات النظام."
`;

const technicalArchitecture = `
# الوثيقة التقنية التفصيلية - نظام عين الصقر (Eagle Eye)

هذه الوثيقة مخصصة للإجابة على الأسئلة التقنية العميقة التي قد يطرحها المسؤولون أو الخبراء التقنيون في وزارة الداخلية حول كيفية بناء وبرمجة النظام.

---

## 1. نوع البرمجة والتقنيات المستخدمة (Tech Stack)

تم بناء هذا النظام باستخدام **"تطوير الويب الحديث" (Modern Web Development)**، وتحديداً بنية **تطبيق الصفحة الواحدة (Single Page Application - SPA)**. هذا النوع من البرمجة يضمن سرعة استجابة فائقة وتجربة مستخدم سلسة تشبه تطبيقات سطح المكتب.

### اللغات والأدوات الأساسية:
| التقنية | الوظيفة | لماذا تم اختيارها؟ |
| :--- | :--- | :--- |
| **TypeScript** | لغة البرمجة الأساسية | هي نسخة مطورة من JavaScript تضيف "أنواع البيانات" (Static Typing)، مما يجعل الكود **أكثر أماناً** ويقلل الأخطاء البرمجية بنسبة كبيرة. هذا معيار عالمي للأنظمة الأمنية والحساسة. |
| **React.js (v19)** | مكتبة بناء الواجهة | تسمح ببناء واجهة تفاعلية حية. الميزة الرئيسية هي **DOM الافتراضي** الذي يقوم بتحديث الأجزاء المتغيرة فقط من الشاشة (مثل موقع السيارة) دون إعادة تحميل الصفحة كاملة، مما يوفر سرعة هائلة. |
| **Tailwind CSS** | إطار التصميم | نظام تنسيق يعتمد على الأدوات (Utility-first) لبناء واجهات متجاوبة تعمل على جميع الشاشات والأجهزة اللوحية بكفاءة عالية. |
| **Google Maps API** | محرك الخرائط | تم استخدام واجهة برمجة التطبيقات لخرائط جوجل (JavaScript API) لرسم الطبقات الجغرافية، والتحكم في العلامات (Markers)، وحساب المسافات بدقة. |

---

## 2. شرح المنطق البرمجي (Code Logic)

عندما يسألون: **"كيف يعمل الكود خلف الكواليس؟"**، يمكنك شرح الأجزاء الثلاثة الرئيسية التي برمجتها في ملف \`Dashboard.tsx\`:

### أ. محرك المحاكاة (Simulation Engine)
هذا هو "قلب" النظام الحالي. بدلاً من انتظار بيانات حقيقية (التي غير متوفرة في الهاكاثون)، قمت ببرمجة **حلقة تكرارية (Loop)** تعمل كل ثانية (\`1000ms\`).
*   **الكود:** \`setInterval\` و \`useEffect\`.
*   **الآلية:** في كل ثانية، يقوم الكود بالمرور على جميع المركبات، ويقوم بتحديث إحداثيات خط الطول والعرض (\`lat\`, \`lng\`) بناءً على سرعة السيارة واتجاهها، مع إضافة تغيير عشوائي بسيط لمحاكاة حركة القيادة الطبيعية.

### ب. إدارة الحالة (State Management)
استخدمت تقنية **React Hooks** (تحديداً \`useState\` و \`useRef\`) لإدارة البيانات:
*   **useState:** لتخزين بيانات المركبات التي تتغير وتؤثر على ما يراه المستخدم (مثل عدد المخالفات).
*   **useRef:** للتعامل مع عناصر الخريطة مباشرة (Direct DOM Manipulation) لتحسين الأداء. هذا يمنع "الوميض" أو البطء عند تحديث مواقع مئات السيارات في نفس الوقت.

### ج. نظام الفلترة الذكي (Filtering Logic)
عند الضغط على زر "مطلوب" أو "مفقود":
*   يقوم الكود بتفعيل دالة تصفية (\`filter function\`).
*   يتم إخفاء العلامات (Markers) التي لا تطابق الفئة المختارة عن طريق تغيير خاصية \`visible\` إلى \`false\`، بدلاً من حذفها وإعادة إنشائها، مما يحافظ على استقرار الذاكرة.

---

## 3. الأمان وقابلية التوسع (Security & Scalability)

هذا الجزء مهم جداً للمسؤولين الأمنيين:

*   **التشفير (Encryption):** النظام مصمم ليدعم بروتوكول **HTTPS** الآمن، ويمكن دمج تشفير **AES-256** (المستخدم عسكرياً) لتشفير البيانات المرسلة بين الشريحة في السيارة وغرفة العمليات، لضمان عدم اعتراض موقع المركبات.
*   **التوسع (Scalability):** بفضل استخدام **React** و **Cloud Architecture**، النظام قادر على التعامل مع ملايين الإشارات في نفس الوقت. الكود الحالي (Frontend) مفصول تماماً عن الخادم (Backend)، مما يعني أنه يمكننا ترقية الخوادم ومعالجة البيانات الضخمة (Big Data) دون الحاجة لتغيير واجهة المستخدم.

---

## 4. كيف تجيب على سؤال: "هل هذا متصل بقاعدة بيانات؟"

**الإجابة:**
> "في هذه النسخة الأولية (Prototype) للهاكاثون، البيانات مخزنة محلياً (Local State) لغرض العرض والمحاكاة.
> ولكن الهيكلية البرمجية (\`Interface Definitions\`) التي وضعتها جاهزة تماماً للربط مع أي قاعدة بيانات حقيقية (مثل PostgreSQL أو Oracle) أو واجهة برمجة تطبيقات (API) فور توفرها، بمجرد تغيير مصدر البيانات في الكود."

---

**خلاصة لوزير الداخلية:**
> "معالي الوزير، هذا النظام لم يُبنَ كصفحة ويب عادية، بل كـ **منصة برمجية متكاملة (Software Platform)** باستخدام لغة **TypeScript** الآمنة. لقد ركزت في البرمجة على **الأداء اللحظي (Real-time Performance)** لمعالجة تحركات آلاف المركبات دون تأخير، مع مراعاة معايير التشفير والأمن السيبراني المستقبلية."
`;

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-tajawal">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 mt-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-changa text-primary">الوثائق التقنية وأدلة التحكيم</h1>
            <p className="text-muted-foreground">مرجع شامل للإجابة على أسئلة لجنة التحكيم وشرح الهيكلية التقنية للمشروع.</p>
          </div>
        </div>

        <Tabs defaultValue="judging" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="judging" className="text-lg py-3">
              <Shield className="w-5 h-5 ml-2" /> دليل الرد على التحكيم
            </TabsTrigger>
            <TabsTrigger value="technical" className="text-lg py-3">
              <Cpu className="w-5 h-5 ml-2" /> الهيكلية التقنية
            </TabsTrigger>
          </TabsList>

          <TabsContent value="judging">
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-8 prose prose-invert max-w-none prose-headings:font-changa prose-headings:text-primary prose-p:text-foreground/90 prose-strong:text-primary/90 prose-blockquote:border-r-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:pr-4 prose-blockquote:py-1 prose-blockquote:rounded-l">
                <Streamdown>{judgingGuide}</Streamdown>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-8 prose prose-invert max-w-none prose-headings:font-changa prose-headings:text-primary prose-p:text-foreground/90 prose-strong:text-primary/90 prose-table:border-collapse prose-th:bg-primary/20 prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-border">
                <Streamdown>{technicalArchitecture}</Streamdown>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
