import type { SiteData } from './data';

export type Locale = 'ar' | 'en';

export const defaultEnglishContent: Partial<SiteData> = {
  brand: {
    name: 'Design Studio',
    englishName: 'DESIGN STUDIO',
    tagline: 'Spaces told through detail',
    intro: 'We design calm, and give it a presence.',
    description: 'An interior design and turnkey execution studio creating personal, quiet spaces with lasting character.',
    logoText: 'A',
    foundedYear: '2012',
    location: 'Riyadh',
  },
  seo: { title: 'Design Studio', description: 'Interior design and turnkey execution studio creating personal, quiet spaces.', ogImage: '/assets/hero-luxury-new.webp' },
  contact: {
    phone: '+966 50 123 4567',
    whatsapp: '966501234567',
    email: 'hello@example.com',
    address: 'Riyadh · Al Nakheel',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    telegram: 'https://t.me/',
    linkedin: 'https://linkedin.com/',
    tiktok: 'https://tiktok.com/',
  },
  heroSlides: [
    { id: 'hero-1', eyebrow: 'INTERIORS · TURNKEY DELIVERY', title: 'Luxury becomes\nquiet.', subtitle: 'We turn space into an experience that feels like you — honest materials, measured proportions, and details that stay.', image: '/assets/hero-luxury-new.webp' },
    { id: 'hero-2', eyebrow: 'RESIDENTIAL · NORTH RIYADH', title: 'Natural light,\nlasting presence.', subtitle: 'A warm architectural language flowing from the facade to the final detail of your home.', image: '/assets/hero-luxury-alt.webp' },
    { id: 'hero-3', eyebrow: 'KITCHENS & DINING · 2025', title: 'Details that\nopen the appetite.', subtitle: 'Practical solutions with an artistic touch, from the first plan to the final handle.', image: '/assets/kitchen.jpg' },
  ],
  stats: [
    { value: 12, suffix: '+', label: 'Years of experience' },
    { value: 86, suffix: '+', label: 'Completed projects' },
    { value: 97, suffix: '%', label: 'Client satisfaction' },
    { value: 14, suffix: '', label: 'Awards & certifications' },
  ],
  categories: [
    { id: 'all', name: 'All projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'commercial', name: 'Commercial' },
  ],
  projects: [
    { id: 'project-1', title: 'Cypress House', categoryId: 'residential', location: 'Riyadh · Al Malqa', year: '2024', description: 'A family home of stone volumes and natural timber welcoming the morning light.', image: '/assets/villa.jpg', featured: true },
    { id: 'project-2', title: 'Nuzul Salon', categoryId: 'hospitality', location: 'AlUla · Oasis District', year: '2024', description: 'A hospitality experience inspired by rock strata and earth after rain.', image: '/assets/lounge.webp', featured: true },
    { id: 'project-3', title: 'Al Mada Kitchen', categoryId: 'residential', location: 'Riyadh · Al Yasmin', year: '2025', description: 'An open kitchen balancing everyday performance with a quiet gallery feeling.', image: '/assets/kitchen.jpg', featured: true },
    { id: 'project-4', title: 'Horizon Majlis', categoryId: 'commercial', location: 'Jeddah · Corniche', year: '2023', description: 'A warm commercial identity for a reception lounge overlooking the sea.', image: '/assets/hero-living.webp', featured: false },
  ],
  materials: [
    { id: 'mat-1', name: 'Calacatta Marble', type: 'Natural stone', note: 'Quiet grey veining · honed finish', image: '/assets/kitchen.jpg', tone: 'ivory' },
    { id: 'mat-2', name: 'Smoked Oak', type: 'Natural wood', note: 'Warm texture · botanical oils', image: '/assets/villa.jpg', tone: 'wood' },
    { id: 'mat-3', name: 'Sand Linen', type: 'Textile', note: 'Handwoven · earthy tone', image: '/assets/lounge.webp', tone: 'sand' },
    { id: 'mat-4', name: 'Aged Bronze', type: 'Metal', note: 'Cast details · low sheen', image: '/assets/hero-living.webp', tone: 'bronze' },
  ],
  packages: [
    { id: 'essential', name: 'Essential', description: 'Planning, colour palette, and construction drawings.', price: 850, accent: 'sand' },
    { id: 'signature', name: 'Signature', description: 'Complete design, 3D visualisation, and material selection.', price: 1450, accent: 'gold' },
    { id: 'bespoke', name: 'Bespoke', description: 'Full supervision and turnkey delivery through handover.', price: 2200, accent: 'dark' },
  ],
  process: [
    { id: 'step-1', number: '01', title: 'We listen to the space', description: 'We begin by understanding your day, your taste, and how you want the space to feel.' },
    { id: 'step-2', number: '02', title: 'We draw the possibility', description: 'We turn the idea into clear plans, materials, and three-dimensional scenes.' },
    { id: 'step-3', number: '03', title: 'We craft the details', description: 'We select makers and materials, then lead execution from the first piece to the last.' },
    { id: 'step-4', number: '04', title: 'We deliver the feeling', description: 'We review every detail and hand over a space ready for life, not just a photograph.' },
  ],
  comparison: { conceptImage: '/assets/hero-living.webp', realityImage: '/assets/lounge.webp', title: 'The idea does not end on screen.', description: 'We protect the spirit of the visual from the first 3D perspective to the final detail on site.' },
  partners: ['PORCELANOSA', 'BOFFI', 'MOLTENI&C', 'LIVING DIVANI', 'FLOS', 'GUBI'],
  ui: {
    explore: 'Explore', findUs: 'Find us', navProjects: 'Projects', navMaterials: 'Materials', navProcess: 'Method', navContact: 'Contact', startConversation: 'Start a conversation', calculate: 'Estimate your budget', seeProjects: 'See our work', discover: 'Discover', philosophy: 'Our philosophy', howWeWork: 'How we work', featuredWork: 'Work with presence', featuredSubtitle: 'A selection of spaces designed to remain, not just to be photographed.', materialsTitle: 'Material dictionary', materialsSubtitle: 'Materials chosen for texture before form.', dragToExplore: 'Drag to explore', concept: 'Concept', reality: 'Reality', startProject: 'Start your project', methodTitle: 'Quietly, we reach the better', methodSubtitle: 'A clear method makes the journey as enjoyable as the result.', contactTitle: 'Let’s talk about\nthe place you dream of.', contactCta: 'Contact us', menu: 'Navigation', about: 'About the studio', projects: 'Projects', lookbook: 'Material dictionary', process: 'Our method', contactUs: 'Contact us', whatsapp: 'WhatsApp', close: 'Close', zoom: 'Zoom', details: 'View details', preliminary: 'Initial estimate', measureDream: 'Let’s measure the dream\na little closer.', area: 'Area in square metres', choosePackage: 'Choose a package', estimate: 'Initial estimate', sendWhatsapp: 'Send estimate on WhatsApp', all: 'All projects', project: 'Project', material: 'Material', adminLink: 'Edit content', brandLabel: 'Brand', studio: 'Design studio & execution', introEstablished: 'EST.', introLocation: 'Riyadh', processMark: 'DESIGN METHOD', comparisonKicker: 'FROM IDEA TO REALITY', comparisonConcept: 'Concept', comparisonReality: 'Reality', comparisonBadge: 'Detail\nis the difference', partnersLabel: 'We choose partners\nas we choose materials', ctaEyebrow: 'YOUR SPACE STARTS HERE', footerDescription: 'Interior design and turnkey execution, shaped around the way you live.', footerRights: 'All rights reserved.', adminSecure: 'SECURE ADMIN', adminLoginTitle: 'Welcome back.', adminLoginSubtitle: 'Sign in to manage your website content and publish changes for every visitor.', adminEmail: 'Email address', adminPassword: 'Password', adminSubmit: 'Secure sign in', adminBack: 'Back to site', adminLoading: 'Loading admin…', adminCloudEditor: 'CLOUD EDITOR', adminCloudMode: 'Cloud editing mode', adminViewSite: 'View site', adminRestore: 'Restore defaults', adminSaveLocal: 'Cloud + local backup', comparisonAltConcept: 'Project concept', comparisonAltReality: 'Built result' },
};

function mergeArray<T extends { id: string }>(base: T[], override?: T[]) {
  if (!override?.length) return base;
  return base.map((item) => override.find((candidate) => candidate.id === item.id) ? { ...item, ...override.find((candidate) => candidate.id === item.id) } : item);
}

function mergeStats(base: SiteData['stats'], override?: SiteData['stats']) {
  return override?.length ? base.map((item, index) => ({ ...item, ...(override[index] || {}) })) : base;
}

export function localizeData(data: SiteData, locale: Locale): SiteData {
  if (locale === 'ar') return data;
  const user = data.translations?.en || {};
  const seed = defaultEnglishContent;
  return {
    ...data,
    brand: { ...data.brand, ...(seed.brand || {}), ...(user.brand || {}) },
    contact: { ...data.contact, ...(seed.contact || {}), ...(user.contact || {}) },
    heroSlides: mergeArray((seed.heroSlides || data.heroSlides) as SiteData['heroSlides'], user.heroSlides),
    stats: mergeStats((seed.stats || data.stats) as SiteData['stats'], user.stats),
    categories: mergeArray((seed.categories || data.categories) as SiteData['categories'], user.categories),
    projects: mergeArray((seed.projects || data.projects) as SiteData['projects'], user.projects),
    materials: mergeArray((seed.materials || data.materials) as SiteData['materials'], user.materials),
    packages: mergeArray((seed.packages || data.packages) as SiteData['packages'], user.packages),
    process: mergeArray((seed.process || data.process) as SiteData['process'], user.process),
    comparison: { ...data.comparison, ...(seed.comparison || {}), ...(user.comparison || {}) },
    partners: user.partners || seed.partners || data.partners,
    ui: { ...(data.ui || {}), ...(seed.ui || {}), ...(user.ui || {}) },
  };
}

export function updateEnglishField(data: SiteData, path: string, value: string): SiteData {
  const next = JSON.parse(JSON.stringify(data)) as SiteData;
  next.translations ??= { en: {} };
  next.translations.en ??= {};
  const keys = path.split('.');
  let cursor: any = next.translations.en;
  keys.slice(0, -1).forEach((key, index) => {
    const nextKey = keys[index + 1];
    if (cursor[key] == null) cursor[key] = /^\d+$/.test(nextKey) ? [] : {};
    cursor = cursor[key];
  });
  cursor[keys[keys.length - 1]] = value;
  return next;
}

export function ui(data: SiteData, locale: Locale, key: keyof NonNullable<SiteData['ui']>, fallback: string): string {
  if (locale === 'en') return (localizeData(data, 'en').ui?.[key] as string) || fallback;
  return (data.ui?.[key] as string) || fallback;
}
