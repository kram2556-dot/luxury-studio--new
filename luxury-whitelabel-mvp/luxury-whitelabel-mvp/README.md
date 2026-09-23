# Athir Studio — Cloudflare Pages MVP

قالب React/Vite ثابت ثنائي اللغة AR/EN بنظام White-Label، مع وظائف Cloudflare Pages مدمجة داخل `functions/api/`. يدعم الموقع تبديل اتجاه الواجهة فورياً، وتخزين النصوص العربية والإنجليزية والهوية والروابط والصور في Cloudflare KV، مع fallback افتراضي حتى يعمل الموقع أيضاً قبل ربط KV.

## البنية

```text
luxury-whitelabel-mvp/
├── functions/api/
│   ├── data.ts       # GET /api/data
│   ├── save.ts       # POST /api/save
│   ├── login.ts      # POST /api/login
│   ├── _auth.ts      # جلسات Cookie موقعة
│   └── _data.ts      # الدمج والتحقق وKV helpers
├── src/
│   ├── App.tsx
│   ├── data.ts       # fallback الافتراضي
│   ├── index.css
│   ├── lib/storage.ts
│   └── pages/Admin.tsx
├── public/
│   ├── assets/
│   └── _redirects
├── index.html
├── vite.config.ts
└── package.json
```

## التشغيل والبناء

```bash
npm install
npm run check
npm run build
```

يخرج البناء النهائي في مجلد `dist` مباشرة، وهو مجلد النشر المطلوب في Cloudflare Pages.

## إعداد Cloudflare Pages

1. اربط مستودع GitHub بمشروع Cloudflare Pages.
2. استخدم الإعدادات التالية:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`
3. أنشئ KV Namespace من Cloudflare باسم اختياري.
4. من إعدادات المشروع، أضف Binding باسم **`SITE_KV`** واربطه بالـ KV Namespace.
5. أضف متغيرات البيئة التالية في Production وPreview:
   - `ADMIN_EMAIL`: بريد مدير الموقع.
   - `ADMIN_PASSWORD`: كلمة مرور قوية لا تُحفظ داخل الكود.
   - `SESSION_SECRET`: قيمة عشوائية طويلة لتوقيع الجلسات.
6. أعد النشر، ثم افتح `/admin` لتسجيل الدخول.

يمكن استخدام `wrangler.toml.example` كمرجع، لكن يجب إدخال معرف KV الحقيقي من لوحة Cloudflare أو ربطه من إعدادات Pages.

## API

### `GET /api/data`

يقرأ المفتاحين التاليين من `SITE_KV` بالتوازي:

- `site_content`: الهوية، الاتصال، الشرائح، الأقسام، الخامات، الباقات، المقارنة، مراحل التنفيذ، والشركاء.
- `site_projects`: مصفوفة المشاريع والصور الخاصة بها.

عند غياب KV أو فراغ المفتاحين، تعود الوظيفة بالبيانات الافتراضية الموجودة في `src/data.ts`.

### `POST /api/login`

يستقبل:

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

عند نجاح التحقق يصدر Cookie من نوع `HttpOnly; Secure; SameSite=Strict` لمدة 8 ساعات. لا توجد بيانات دخول افتراضية صالحة في الإنتاج؛ يجب إعداد متغيرات البيئة.

### `POST /api/save`

يحتاج Cookie جلسة صحيحة. يستقبل `{ "data": SiteData }`، ثم يقسم الحمولة ويحفظها في `site_content` و`site_projects` باستخدام عمليتي KV متوازيتين. تحفظ لوحة الإدارة نسخة محلية احتياطية أيضاً كي لا تضيع التعديلات عند انقطاع الاتصال.

## ضغط الصور

لوحة الإدارة تضغط الصور داخل المتصفح قبل الإرسال:

- صيغة WebP.
- أقصى عرض أو ارتفاع: 1200px.
- هدف حجم: أقل من 200KB.
- عند تعذر الوصول إلى الحجم المستهدف تظهر رسالة تطلب اختيار صورة أبسط أو أصغر.

لا تضع مفاتيح وصول Cloudflare أو كلمات المرور داخل المستودع.

## المزايا الموجودة

- Intro سينمائية قابلة للتخطي.
- Hero Slider بتبديل تلقائي، مؤشرات تنقل، وانتقال ناعم بين الصور والنصوص.
- حاسبة تقديرية وإرسال التفاصيل إلى واتساب.
- Lookbook للخامات.
- معرض مشاريع أفقي يدعم الفلاتر والسحب باللمس، الأسهم الدائرية الجانبية على الكمبيوتر، وLightbox.
- مقارنة 3D vs Reality.
- مراحل التنفيذ والعدادات والشركاء.
- فوتر وأزرار اتصال وواتساب عائمة.
- لوحة إدارة سحابية مع fallback محلي.
- زر AR | EN مع تبديل `dir="rtl"` و`dir="ltr"`، وحقول تحرير للمحتوى الإنجليزي داخل لوحة الإدارة.
- رفع لوجو WebP وروابط اجتماعية قابلة للتعديل، بما فيها Instagram وFacebook وLinkedIn وTikTok.
- خلفيات Hero معمارية WebP محسّنة ومساحة آمنة للنص وطبقة تدرج داكنة.
- خط Tajawal هندسي محمّل من Google Fonts بأوزان 400/500/700/800، مع وزن 700 للعناوين الرئيسية.
- ملف `_redirects` لمسارات SPA مثل `/admin`.

## تنبيه مهم

Cloudflare KV مناسب لمحتوى MVP صغير ومتكرر القراءة. الصور المضمّنة في البيانات تبقى تحت حدود KV العملية بفضل ضغط WebP، لكن معرضاً كبيراً جداً أو عدة عملاء يحتاج لاحقاً إلى تخزين ملفات مثل R2 بدلاً من وضع الصور داخل KV.
