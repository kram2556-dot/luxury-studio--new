export type Category = {
  id: string;
  name: string;
};

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
};

export type Project = {
  id: string;
  title: string;
  categoryId: string;
  location: string;
  year: string;
  description: string;
  image: string;
  featured?: boolean;
};

export type Material = {
  id: string;
  name: string;
  type: string;
  note: string;
  image: string;
  tone: string;
};

export type PricePackage = {
  id: string;
  name: string;
  description: string;
  price: number;
  accent: string;
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type Stat = {
  value: number;
  valueAr?: string;
  valueEn?: string;
  suffix: string;
  label: string;
};

export type UiCopy = Record<string, string>;

export type SiteData = {
  brand: {
    name: string;
    englishName: string;
    tagline: string;
    intro: string;
    description: string;
    logoText: string;
    logoImage?: string;
    foundedYear: string;
    location: string;
    favicon?: string;
    primaryColor?: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    instagram: string;
    facebook: string;
    telegram: string;
    linkedin: string;
    tiktok: string;
  };
  heroSlides: HeroSlide[];
  stats: Stat[];
  categories: Category[];
  projects: Project[];
  materials: Material[];
  packages: PricePackage[];
  process: ProcessStep[];
  seo: {
    title: string;
    description: string;
    ogImage?: string;
    schemaType?: string;
  };
  comparison: {
    conceptImage: string;
    realityImage: string;
    title: string;
    description: string;
  };
  partners: string[];
  ui?: UiCopy;
  translations?: {
    en?: Partial<Omit<SiteData, 'translations'>>;
  };
};

export const defaultData: SiteData = {
  brand: {
    name: 'استوديو التصميم',
    englishName: 'DESIGN STUDIO',
    tagline: 'مساحات تُروى بالتفاصيل',
    intro: 'نصمم الهدوء، ونبني حضوره.',
    description: 'استوديو تصميم داخلي وتنفيذ متكامل يصنع مساحات شخصية، هادئة، وممتدة الأثر.',
    logoText: 'A',
    logoImage: '',
    foundedYear: '2012',
    location: 'الرياض',
    favicon: '/favicon.ico',
    primaryColor: '#c5a880',
  },
  seo: {
    title: 'استوديو التصميم الفاخر',
    description: 'استوديو تصميم داخلي وتنفيذ متكامل يصنع مساحات شخصية، هادئة، وممتدة الأثر.',
    ogImage: '/assets/hero-luxury-new.webp',
    schemaType: 'InteriorDesignStudio',
  },
  contact: {
    phone: '+966 50 123 4567',
    whatsapp: '966501234567',
    email: 'hello@example.com',
    address: 'الرياض · حي النخيل',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    telegram: 'https://t.me/',
    linkedin: 'https://linkedin.com/',
    tiktok: 'https://tiktok.com/',
  },
  heroSlides: [
    {
      id: 'hero-1',
      eyebrow: 'تصميم داخلي · تنفيذ متكامل',
      title: 'الفخامة حين تصبح\nأكثر هدوءاً.',
      subtitle: 'نحوّل المساحة إلى تجربة تشبهك؛ بخامات صادقة، ونِسَب محسوبة، وتفاصيل لا تُنسى.',
      image: '/assets/hero-luxury-new.webp',
    },
    {
      id: 'hero-2',
      eyebrow: 'مشروع سكني · شمال الرياض',
      title: 'ضوء طبيعي،\nوحضور دائم.',
      subtitle: 'لغة معمارية دافئة تعبر من الواجهة إلى آخر تفصيل في منزلك.',
      image: '/assets/hero-luxury-alt.webp',
    },
    {
      id: 'hero-3',
      eyebrow: 'مطابخ وولائم · 2025',
      title: 'التفاصيل التي\nتفتح الشهية.',
      subtitle: 'حلول عملية بلمسة فنية، من أول مخطط حتى آخر مقبض.',
      image: '/assets/kitchen.jpg',
    },
  ],
  stats: [
    { value: 12, valueAr: '12', valueEn: '12', suffix: '+', label: 'عاماً من الخبرة' },
    { value: 86, valueAr: '86', valueEn: '86', suffix: '+', label: 'مشروعاً مكتملًا' },
    { value: 97, valueAr: '97', valueEn: '97', suffix: '%', label: 'رضا العملاء' },
    { value: 14, valueAr: '14', valueEn: '14', suffix: '', label: 'جائزة وشهادة' },
  ],
  categories: [
    { id: 'all', name: 'كل المشاريع' },
    { id: 'residential', name: 'سكني' },
    { id: 'hospitality', name: 'ضيافة' },
    { id: 'commercial', name: 'تجاري' },
  ],
  projects: [
    {
      id: 'project-1',
      title: 'بيت السرو',
      categoryId: 'residential',
      location: 'الرياض · حي الملقا',
      year: '2024',
      description: 'منزل عائلي بتكوينات حجرية وأخشاب طبيعية تستقبل ضوء الصباح.',
      image: '/assets/villa.jpg',
      featured: true,
    },
    {
      id: 'project-2',
      title: 'صالون نُزل',
      categoryId: 'hospitality',
      location: 'العلا · واحة الضيافة',
      year: '2024',
      description: 'تجربة ضيافة مستوحاة من طبقات الصخر ولون الأرض بعد المطر.',
      image: '/assets/lounge.webp',
      featured: true,
    },
    {
      id: 'project-3',
      title: 'مطبخ المدى',
      categoryId: 'residential',
      location: 'الرياض · الياسمين',
      year: '2025',
      description: 'مطبخ مفتوح يجمع الأداء اليومي مع إحساس المعرض الهادئ.',
      image: '/assets/kitchen.jpg',
      featured: true,
    },
    {
      id: 'project-4',
      title: 'مجلس الأفق',
      categoryId: 'commercial',
      location: 'جدة · الكورنيش',
      year: '2023',
      description: 'هوية تجارية دافئة لردهة استقبال تطل على البحر.',
      image: '/assets/hero-living.webp',
      featured: false,
    },
  ],
  materials: [
    { id: 'mat-1', name: 'رخام كالاكاتا', type: 'حجر طبيعي', note: 'عروق رمادية هادئة · تشطيب مطفي', image: '/assets/kitchen.jpg', tone: 'ivory' },
    { id: 'mat-2', name: 'بلوط مدخّن', type: 'خشب طبيعي', note: 'ملمس دافئ · زيوت نباتية', image: '/assets/villa.jpg', tone: 'wood' },
    { id: 'mat-3', name: 'كتان رملي', type: 'نسيج', note: 'نسج يدوي · لون ترابي', image: '/assets/lounge.webp', tone: 'sand' },
    { id: 'mat-4', name: 'برونز معتّق', type: 'معدن', note: 'تفاصيل مصبوبة · لمعان منخفض', image: '/assets/hero-living.webp', tone: 'bronze' },
  ],
  packages: [
    { id: 'essential', name: 'الأساسي', description: 'تخطيط، لوحة ألوان، ومخططات تنفيذية.', price: 850, accent: 'sand' },
    { id: 'signature', name: 'التوقيع', description: 'تصميم متكامل، 3D، واختيار الخامات.', price: 1450, accent: 'gold' },
    { id: 'bespoke', name: 'مفصّل لك', description: 'إشراف وتنفيذ متكامل حتى التسليم.', price: 2200, accent: 'dark' },
  ],
  process: [
    { id: 'step-1', number: '01', title: 'نستمع للمكان', description: 'نبدأ بفهم يومك، ذوقك، وما الذي تريد أن تشعر به داخل المساحة.' },
    { id: 'step-2', number: '02', title: 'نرسم الاحتمال', description: 'نحوّل الفكرة إلى مخططات، خامات، ومشاهد ثلاثية الأبعاد واضحة.' },
    { id: 'step-3', number: '03', title: 'نصنع التفاصيل', description: 'نختار الحرفيين والخامات وندير التنفيذ بعناية من أول قطعة حتى الأخيرة.' },
    { id: 'step-4', number: '04', title: 'نسلّم الأثر', description: 'نراجع كل تفصيل، ثم نسلّمك مساحة جاهزة للحياة، لا للصورة فقط.' },
  ],
  comparison: {
    conceptImage: '/assets/hero-living.webp',
    realityImage: '/assets/lounge.webp',
    title: 'الفكرة لا تنتهي عند الشاشة.',
    description: 'نحافظ على روح التصور من أول منظور ثلاثي الأبعاد حتى آخر تفصيل في الموقع.',
  },
  partners: ['PORCELANOSA', 'BOFFI', 'MOLTENI&C', 'LIVING DIVANI', 'FLOS', 'GUBI'],
  ui: {
    explore: 'استكشف',
    findUs: 'نحن هنا',
    navProjects: 'الأعمال',
    navMaterials: 'الخامات',
    navProcess: 'المنهج',
    navContact: 'تواصل',
    startConversation: 'ابدأ حواراً',
    calculate: 'احسب ميزانيتك',
    seeProjects: 'شاهد أعمالنا',
    discover: 'اكتشف',
    philosophy: 'فلسفتنا',
    howWeWork: 'كيف نعمل',
    featuredWork: 'أعمال لها حضور',
    featuredSubtitle: 'مختارات من مساحات صممناها لتبقى، لا لتُلتقط فقط.',
    materialsTitle: 'قاموس الخامات',
    materialsSubtitle: 'مواد مختارة بعين تحب الملمس، قبل الشكل.',
    dragToExplore: 'اسحب للاكتشاف',
    concept: 'التصور',
    reality: 'الواقع',
    startProject: 'ابدأ مشروعك',
    methodTitle: 'بهدوء، نصل للأفضل',
    methodSubtitle: 'منهج واضح يجعل الرحلة ممتعة بقدر النتيجة.',
    contactTitle: 'لنتحدث عن\nالمكان الذي تحلم به.',
    contactCta: 'تواصل معنا',
    menu: 'تنقّل',
    about: 'عن الاستوديو',
    projects: 'المشاريع',
    lookbook: 'قاموس الخامات',
    process: 'منهج التنفيذ',
    contactUs: 'تواصل معنا',
    whatsapp: 'واتساب',
    close: 'إغلاق',
    zoom: 'تكبير',
    details: 'عرض التفاصيل',
    preliminary: 'تقدير أولي',
    measureDream: 'لنقيس الحلم\nبشكل أقرب.',
    area: 'المساحة بالمتر المربع',
    choosePackage: 'اختر الباقة',
    estimate: 'التقدير المبدئي',
    sendWhatsapp: 'اعتمد المقايسة عبر واتساب',
    all: 'كل المشاريع',
    project: 'مشروع',
    material: 'خامة',
    adminLink: 'تحرير المحتوى',
    brandLabel: 'هوية العلامة',
    studio: 'استوديو تصميم وتنفيذ',
    hero: 'البانر الرئيسي',
    philosophyText: 'نحن لا نملأ الفراغ.\nنمنحه معنى.',
  },
  translations: {
    en: {
      brand: {
        name: 'Design Studio',
        englishName: 'DESIGN STUDIO',
        tagline: 'Spaces told through details',
        intro: 'We design calm, and build its presence.',
        description: 'An interior design and full execution studio crafting personal, quiet, and lasting spaces.',
        logoText: 'A',
        foundedYear: '2012',
        location: 'Riyadh',
      },
      seo: {
        title: 'Luxury Design Studio',
        description: 'An interior design and full execution studio crafting personal, quiet, and lasting spaces.',
      },
      contact: {
        address: 'Riyadh · Al Nakheel Dist.',
      },
      heroSlides: [
        {
          id: 'hero-1',
          eyebrow: 'Interior Architecture · Full Execution',
          title: 'Luxury Becomes\nMore Serene.',
          subtitle: 'Transforming spaces into personal sanctuaries with honest materials and timeless proportions.',
          image: '/assets/hero-luxury-new.webp',
        },
        {
          id: 'hero-2',
          eyebrow: 'Residential Project · North Riyadh',
          title: 'Natural Light,\nEnduring Presence.',
          subtitle: 'A warm architectural language flowing seamlessly into every detail of your home.',
          image: '/assets/hero-luxury-alt.webp',
        },
        {
          id: 'hero-3',
          eyebrow: 'Bespoke Kitchens · 2025',
          title: 'Crafted for\nEvery Day.',
          subtitle: 'Functional elegance sculpted with artistic precision.',
          image: '/assets/kitchen.jpg',
        },
      ],
      stats: [
        { value: 12, valueAr: '12', valueEn: '12', suffix: '+', label: 'Years Experience' },
        { value: 86, valueAr: '86', valueEn: '86', suffix: '+', label: 'Completed Projects' },
        { value: 97, valueAr: '97', valueEn: '97', suffix: '%', label: 'Client Satisfaction' },
        { value: 14, valueAr: '14', valueEn: '14', suffix: '', label: 'Awards & Honors' },
      ],
      categories: [
        { id: 'all', name: 'All Projects' },
        { id: 'residential', name: 'Residential' },
        { id: 'hospitality', name: 'Hospitality' },
        { id: 'commercial', name: 'Commercial' },
      ],
      ui: {
        explore: 'Explore',
        findUs: 'Location',
        navProjects: 'Portfolio',
        navMaterials: 'Materials',
        navProcess: 'Method',
        navContact: 'Contact',
        startConversation: 'Start Conversation',
        calculate: 'Estimate Budget',
        seeProjects: 'View Portfolio',
        discover: 'Discover',
        philosophy: 'Philosophy',
        howWeWork: 'How We Work',
        featuredWork: 'Featured Spaces',
        featuredSubtitle: 'Spaces crafted to linger in memory, not just capture attention.',
        materialsTitle: 'Materials Palette',
        materialsSubtitle: 'Textures selected for how they feel beneath your fingertips.',
        dragToExplore: 'Drag to Explore',
        concept: 'Concept',
        reality: 'Reality',
        startProject: 'Begin Your Project',
        methodTitle: 'Precision Meets Soul',
        methodSubtitle: 'A structured journey making the process as satisfying as the outcome.',
        contactTitle: 'Let Us Discuss\nYour Future Space.',
        contactCta: 'Contact Us',
        menu: 'Menu',
        about: 'About',
        projects: 'Projects',
        lookbook: 'Materials',
        process: 'Method',
        contactUs: 'Get in Touch',
        whatsapp: 'WhatsApp',
        close: 'Close',
        zoom: 'Zoom',
        details: 'Details',
        preliminary: 'Initial Estimate',
        measureDream: 'Let Us Dimension\nYour Ambition.',
        area: 'Floor Area (m²)',
        choosePackage: 'Select Package',
        estimate: 'Estimated Budget',
        sendWhatsapp: 'Approve via WhatsApp',
        all: 'All',
        project: 'Project',
        material: 'Material',
        adminLink: 'Edit Content',
        brandLabel: 'Brand Identity',
        studio: 'Architecture & Interiors',
        hero: 'Main Stage',
        philosophyText: 'We do not fill voids.\nWe give them meaning.',
      },
    },
  },
};

export function cloneData(data: SiteData): SiteData {
  return JSON.parse(JSON.stringify(data)) as SiteData;
}

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function categoryName(data: SiteData, id: string): string {
  return data.categories.find((category) => category.id === id)?.name ?? 'غير مصنف';
}
