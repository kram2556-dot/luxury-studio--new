import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  Calculator,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleArrowUp,
  Compass,
  ExternalLink,
  Facebook,
  Instagram,
  Layers3,
  Linkedin,
  Music2,
  Menu,
  Minus,
  MoveUpRight,
  Phone,
  Plus,
  Quote,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import type { Material, Project, SiteData } from './data';
import { categoryName } from './data';
import { localizeData, ui, type Locale } from './i18n';
import { loadSiteData, saveSiteData } from './lib/storage';
import './index.css';

const Admin = lazy(() => import('./pages/Admin'));

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [data, setData] = useState<SiteData>(() => loadSiteData());

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    
    // المزامنة الفورية مع أي حفظ يتم في لوحة الإدارة
    const sync = () => setData(loadSiteData());
    window.addEventListener('site-data-updated', sync);
    window.addEventListener('storage', sync);

    fetch('/api/data', { headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { data?: SiteData } | null) => {
        if (payload?.data) {
          saveSiteData(payload.data);
          setData(payload.data);
        }
      })
      .catch(() => {
        // الاعتماد السلس على المخزن المحلي والبيانات المدمجة
      });

    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('site-data-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (path.startsWith('/admin')) {
    return (
      <Suspense fallback={<div className="admin-loading">Loading admin…</div>}>
        <Admin data={data} onDataChange={setData} />
      </Suspense>
    );
  }
  return <PublicSite data={data} />;
}

function PublicSite({ data: rawData }: { data: SiteData }) {
  const [introVisible, setIntroVisible] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<Project | Material | null>(null);
  const [showCalc, setShowCalc] = useState(false);
  const [locale, setLocale] = useState<Locale>(() =>
    window.localStorage.getItem('site-locale') === 'en' ? 'en' : 'ar',
  );
  const displayData = useMemo(() => localizeData(rawData, locale), [rawData, locale]);
  const data = displayData;
  const t = (key: keyof NonNullable<SiteData['ui']>, fallback: string) =>
    ui(rawData, locale, key, fallback);

  useEffect(() => {
    const pageTitle =
      locale === 'ar'
        ? rawData.seo.title
        : localizeData(rawData, 'en').seo?.title || rawData.seo.title;
    const pageDesc =
      locale === 'ar'
        ? rawData.seo.description
        : localizeData(rawData, 'en').seo?.description || rawData.seo.description;

    document.title = pageTitle;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', pageDesc);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', pageDesc);

    if (rawData.seo.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', rawData.seo.ogImage);
    }

    let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = rawData.brand.favicon || '/assets/hero-luxury-new.webp';

    let schemaScript = document.getElementById('schema-jsonld') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': rawData.seo.schemaType || 'InteriorDesignStudio',
      name: locale === 'ar' ? rawData.brand.name : rawData.brand.englishName,
      description: pageDesc,
      url: window.location.origin,
      telephone: rawData.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: rawData.contact.address,
      },
    });

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem('site-locale', locale);
  }, [locale, rawData]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 2100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveSlide((slide) => (slide + 1) % Math.max(1, data.heroSlides.length)),
      6200,
    );
    return () => window.clearInterval(timer);
  }, [data.heroSlides.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox || menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox, menuOpen]);

  useEffect(() => {
    const motionTargets = document.querySelectorAll<HTMLElement>(
      '.statement-grid, .stats-grid, .section-heading, .filter-row, .project-card, .materials-grid, .material-card, .comparison-copy, .comparison-visual, .process-card, .partners-inner, .cta-inner',
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      motionTargets.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    motionTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [locale, data.projects.length, data.materials.length, data.process.length]);

  const hero = data.heroSlides[activeSlide] ?? data.heroSlides[0];
  const filteredProjects = useMemo(
    () =>
      data.projects.filter(
        (project) => activeCategory === 'all' || project.categoryId === activeCategory,
      ),
    [data.projects, activeCategory],
  );

  const jumpTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nextSlide = () =>
    setActiveSlide((slide) => (slide + 1) % Math.max(1, data.heroSlides.length));
  const previousSlide = () =>
    setActiveSlide(
      (slide) => (slide - 1 + data.heroSlides.length) % Math.max(1, data.heroSlides.length),
    );

  return (
    <div className="site-shell" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {introVisible && (
        <Intro brand={displayData.brand} locale={locale} onSkip={() => setIntroVisible(false)} />
      )}
      <header className="site-header">
        <button
          className="brand-lockup"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={locale === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'}
        >
          <span className="brand-mark">
            {displayData.brand.logoImage ? (
              <img src={displayData.brand.logoImage} alt={displayData.brand.name} />
            ) : (
              displayData.brand.logoText || 'A'
            )}
          </span>
          <span className="brand-copy">
            <strong>{displayData.brand.name}</strong>
            <small>{displayData.brand.englishName}</small>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          <button onClick={() => jumpTo('projects')}>{t('navProjects', 'الأعمال')}</button>
          <button onClick={() => jumpTo('lookbook')}>{t('navMaterials', 'الخامات')}</button>
          <button onClick={() => jumpTo('process')}>{t('navProcess', 'المنهج')}</button>
          <button onClick={() => jumpTo('contact')}>{t('navContact', 'تواصل')}</button>
        </nav>
        <div className="header-actions">
          <button
            className="language-toggle"
            onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
            aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            {locale === 'ar' ? 'AR | EN' : 'EN | AR'}
          </button>
          <a
            className="header-whatsapp"
            href={whatsappUrl(
              displayData.contact.whatsapp,
              locale === 'ar'
                ? 'مرحباً، أرغب في معرفة المزيد عن خدمات التصميم.'
                : 'Hello, I would like to learn more about your design services.',
            )}
            target="_blank"
            rel="noreferrer"
          >
            <span>{t('startConversation', 'ابدأ حواراً')}</span>
            <ArrowUpLeft size={16} />
          </a>
          <button
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="top">
          <div
            key={hero?.id}
            className="hero-media hero-slide-enter"
            style={{ backgroundImage: `url(${hero?.image})` }}
            aria-label={hero?.title}
            role="img"
          >
            <div className="hero-shade" />
          </div>
          <div className="hero-grid container">
            <div className="hero-content reveal-up">
              <span className="eyebrow light">
                <span className="eyebrow-line" />
                {hero?.eyebrow}
              </span>
              <h1>
                {hero?.title?.split('\n').map((line, index) => (
                  <span key={line + index}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              <p>{hero?.subtitle}</p>
              <div className="hero-ctas">
                <button className="button button-gold" onClick={() => setShowCalc(true)}>
                  {t('calculate', 'احسب ميزانيتك')} <ArrowUpLeft size={17} />
                </button>
                <button className="text-link light" onClick={() => jumpTo('projects')}>
                  {t('seeProjects', 'شاهد أعمالنا')} <ArrowLeft size={17} />
                </button>
              </div>
            </div>
            <div className="hero-side-note">
              <span className="dir-ltr-num">
                01 / 0{data.heroSlides.length}
              </span>
              <span className="side-note-rule" />
              <span>{t('studio', 'استوديو تصميم وتنفيذ')}</span>
            </div>
            <div className="hero-controls">
              <button onClick={previousSlide} aria-label="الشريحة السابقة">
                <ArrowRight size={18} />
              </button>
              <div className="hero-dots">
                {data.heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={index === activeSlide ? 'active' : ''}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`انتقل إلى الشريحة ${index + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} aria-label="الشريحة التالية">
                <ArrowLeft size={18} />
              </button>
            </div>
          </div>
          <button
            className="scroll-cue"
            onClick={() => jumpTo('about')}
            aria-label={t('discover', 'اكتشف')}
          >
            <span>{t('discover', 'اكتشف')}</span>
            <ChevronDown size={16} />
          </button>
        </section>

        <section className="statement-section" id="about">
          <div className="container statement-grid">
            <div className="section-kicker">
              <span className="number dir-ltr-num">01</span>
              <span className="kicker-rule" />
              <span>{t('philosophy', 'فلسفتنا')}</span>
            </div>
            <div className="statement-copy">
              <p className="display-quote">
                {t('philosophyText', 'نحن لا نملأ الفراغ.\nنمنحه معنى.')
                  .split('\n')
                  .map((line, index) => (
                    <span key={line + index}>
                      {index > 0 && <br />}
                      <em>{line}</em>
                    </span>
                  ))}
              </p>
              <p className="body-lead">{data.brand.description}</p>
              <button className="text-link dark" onClick={() => jumpTo('process')}>
                {t('howWeWork', 'كيف نعمل')} <ArrowLeft size={17} />
              </button>
            </div>
            <div className="statement-orbit">
              <div className="orbit-ring" />
              <Sparkles size={19} />
              <span>
                {locale === 'ar' ? (
                  <>
                    مساحات
                    <br />
                    بروحك
                  </>
                ) : (
                  <>
                    Spaces
                    <br />
                    with soul
                  </>
                )}
              </span>
            </div>
          </div>
        </section>

        {/* شريط الإحصاءات: الأرقام إنجليزية دائماً */}
        <section className="stats-strip">
          <div className="container stats-grid">
            {data.stats.map((stat, idx) => {
              const rawVal =
                locale === 'ar'
                  ? stat.valueAr || stat.value
                  : stat.valueEn || stat.value;
              return (
                <div className="stat-item" key={stat.label || idx}>
                  <span className="stat-value dir-ltr-num">
                    {rawVal}
                    <small>{stat.suffix}</small>
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* قسم المشاريع والكبسولات بالأرقام على نمط Clear Vision ونبيل خميس */}
        <section className="section section-projects" id="projects">
          <div className="container">
            <SectionHeading
              index="02"
              title={t('featuredWork', 'أعمال لها حضور')}
              subtitle={t(
                'featuredSubtitle',
                'مختارات من مساحات صممناها لتبقى، لا لتُلتقط فقط.',
              )}
              action={
                <button
                  className="circle-arrow"
                  onClick={() => setShowCalc(true)}
                  aria-label={t('calculate', 'احسب ميزانيتك')}
                >
                  <Calculator size={18} />
                </button>
              }
            />
            <div className="filter-row" role="tablist" aria-label="فلترة المشاريع">
              {data.categories.map((category) => {
                const count =
                  category.id === 'all'
                    ? data.projects.length
                    : data.projects.filter((p) => p.categoryId === category.id).length;
                return (
                  <button
                    key={category.id}
                    className={
                      activeCategory === category.id ? 'filter-pill active' : 'filter-pill'
                    }
                    onClick={() => setActiveCategory(category.id)}
                    role="tab"
                    aria-selected={activeCategory === category.id}
                  >
                    <span>{category.name}</span>
                    <span className="filter-pill-count dir-ltr-num">{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="projects-carousel-wrap">
              <button
                className="carousel-side-arrow carousel-side-arrow-next"
                onClick={() =>
                  document.querySelector('.projects-carousel')?.scrollBy({
                    left: 360,
                    behavior: 'smooth',
                  })
                }
                aria-label="المشروع التالي"
              >
                <ChevronLeft size={20} />
              </button>
              <div
                className="projects-carousel"
                onWheel={(event) => {
                  if (Math.abs(event.deltaY) > Math.abs(event.deltaX))
                    event.currentTarget.scrollLeft += event.deltaY;
                }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    category={categoryName(data, project.categoryId)}
                    onOpen={() => setLightbox(project)}
                  />
                ))}
              </div>
              <button
                className="carousel-side-arrow carousel-side-arrow-prev"
                onClick={() =>
                  document.querySelector('.projects-carousel')?.scrollBy({
                    left: -360,
                    behavior: 'smooth',
                  })
                }
                aria-label="المشروع السابق"
              >
                <ChevronRight size={20} />
              </button>
              <div className="carousel-controls">
                <span>{t('dragToExplore', 'اسحب للاكتشاف')}</span>
                <button
                  onClick={() =>
                    document.querySelector('.projects-carousel')?.scrollBy({
                      left: 360,
                      behavior: 'smooth',
                    })
                  }
                  aria-label={t('projects', 'المشاريع')}
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  onClick={() =>
                    document.querySelector('.projects-carousel')?.scrollBy({
                      left: -360,
                      behavior: 'smooth',
                    })
                  }
                  aria-label={t('projects', 'المشاريع')}
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section lookbook-section" id="lookbook">
          <div className="container">
            <SectionHeading
              index="03"
              title={t('materialsTitle', 'قاموس الخامات')}
              subtitle={t('materialsSubtitle', 'مواد مختارة بعين تحب الملمس، قبل الشكل.')}
              action={<span className="section-aside dir-ltr-num">01 — 04 / LOOKBOOK</span>}
            />
            <div className="materials-grid">
              {data.materials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onOpen={() => setLightbox(material)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="comparison-section">
          <div className="container comparison-layout">
            <div className="comparison-copy">
              <div className="section-kicker light">
                <span className="number dir-ltr-num">04</span>
                <span className="kicker-rule" />
                <span>{t('comparisonKicker', 'من الفكرة إلى الواقع')}</span>
              </div>
              <h2>{data.comparison.title}</h2>
              <p>{data.comparison.description}</p>
              <button
                className="button button-outline-light"
                onClick={() => jumpTo('contact')}
              >
                {t('startProject', 'ابدأ مشروعك')} <ArrowUpLeft size={17} />
              </button>
            </div>
            <div className="comparison-visual">
              <div className="comparison-card concept">
                <img
                  src={data.comparison.conceptImage}
                  alt={t('comparisonAltConcept', 'تصور المشروع')}
                />
                <span>{t('comparisonConcept', 'التصور')}</span>
              </div>
              <div className="comparison-card reality">
                <img
                  src={data.comparison.realityImage}
                  alt={t('comparisonAltReality', 'النتيجة المنفذة')}
                />
                <span>{t('comparisonReality', 'الواقع')}</span>
              </div>
              <div className="comparison-badge">
                <Quote size={19} />
                <span>
                  {t('comparisonBadge', 'التفصيل\nهو الفارق')
                    .split('\n')
                    .map((line, index) => (
                      <span key={line}>
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <SectionHeading
              index="05"
              title={t('methodTitle', 'بهدوء، نصل للأفضل')}
              subtitle={t('methodSubtitle', 'منهج واضح يجعل الرحلة ممتعة بقدر النتيجة.')}
              action={
                <div className="process-mark">
                  <Layers3 size={20} />
                  <span>{t('processMark', 'منهج التصميم')}</span>
                </div>
              }
            />
            <div className="process-grid">
              {data.process.map((step, index) => (
                <div className="process-card" key={step.id}>
                  <span className="process-number dir-ltr-num">{step.number}</span>
                  <div className="process-icon">
                    {index === 0 ? (
                      <Compass size={21} />
                    ) : index === 1 ? (
                      <Sparkles size={21} />
                    ) : index === 2 ? (
                      <Layers3 size={21} />
                    ) : (
                      <Check size={21} />
                    )}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {index < data.process.length - 1 && (
                    <ArrowLeft className="process-arrow" size={19} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="partners-section">
          <div className="container partners-inner">
            <span className="partners-label">
              {t('partnersLabel', 'نختار شركاءنا\nكما نختار خاماتنا')
                .split('\n')
                .map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
            </span>
            <div className="partners-marquee">
              {data.partners.concat(data.partners).map((partner, index) => (
                <span key={`${partner}-${index}`}>{partner}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div className="container cta-inner">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-line" />
                {t('ctaEyebrow', 'مساحتك تبدأ من هنا')}
              </span>
              <h2>
                {locale === 'ar' ? (
                  <>
                    لنتحدث عن
                    <br />
                    <em>المكان الذي تحلم به.</em>
                  </>
                ) : (
                  <>
                    Let’s talk about
                    <br />
                    <em>the place you dream of.</em>
                  </>
                )}
              </h2>
            </div>
            <a
              className="cta-round"
              href={whatsappUrl(
                data.contact.whatsapp,
                locale === 'ar'
                  ? `مرحباً ${data.brand.name}، أود مناقشة مشروع جديد.`
                  : `Hello ${data.brand.englishName || data.brand.name}, I would like to discuss a new project.`,
              )}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t('contactCta', 'تواصل معنا')}</span>
              <ArrowUpLeft size={22} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="brand-mark large">
              {data.brand.logoImage ? (
                <img src={data.brand.logoImage} alt={data.brand.name} />
              ) : (
                data.brand.logoText || 'A'
              )}
            </span>
            <span>{data.brand.englishName}</span>
            <p>{data.brand.tagline}</p>
          </div>
          <div className="footer-column">
            <span className="footer-label">{t('navContact', 'تواصل')}</span>
            <a href={`tel:${data.contact.phone}`} className="dir-ltr-num">{data.contact.phone}</a>
            <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
            <span>{data.contact.address}</span>
          </div>
          <div className="footer-column">
            <span className="footer-label">{t('explore', 'استكشف')}</span>
            <button onClick={() => jumpTo('projects')}>{t('navProjects', 'أعمالنا')}</button>
            <button onClick={() => jumpTo('lookbook')}>{t('navMaterials', 'الخامات')}</button>
            <button onClick={() => jumpTo('process')}>{t('navProcess', 'منهجنا')}</button>
          </div>
          <div className="footer-column socials">
            <span className="footer-label">{t('findUs', 'نحن هنا')}</span>
            <div>
              <a href={data.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={data.contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={data.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={data.contact.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
                <Music2 size={18} />
              </a>
            </div>
            <a className="admin-link" href="/admin">
              {t('adminLink', 'تحرير المحتوى')} <ExternalLink size={13} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © <span className="dir-ltr-num">{new Date().getFullYear()}</span> {data.brand.name}.{' '}
            {t('footerRights', 'جميع الحقوق محفوظة.')}
          </span>
          <span>{t('footerDescription', 'تصميم وتنفيذ متكامل.')}</span>
        </div>
      </footer>

      {/* الأزرار العائمة الثابتة */}
      <div className="floating-actions">
        <a href={`tel:${data.contact.phone}`} aria-label="اتصال هاتفي">
          <Phone size={18} />
        </a>
        <a
          className="floating-wa"
          href={whatsappUrl(data.contact.whatsapp, 'مرحباً، أود الاستفسار عن تفاصيل المشروع والتنفيذ.')}
          target="_blank"
          rel="noreferrer"
        >
          <Send size={18} />
        </a>
      </div>

      {menuOpen && (
        <Drawer
          data={data}
          locale={locale}
          onClose={() => setMenuOpen(false)}
          onJump={jumpTo}
        />
      )}
      {lightbox && (
        <Lightbox item={lightbox} locale={locale} onClose={() => setLightbox(null)} />
      )}
      {showCalc && (
        <CalculatorModal data={data} locale={locale} onClose={() => setShowCalc(false)} />
      )}
    </div>
  );
}

function Intro({
  brand,
  locale,
  onSkip,
}: {
  brand: SiteData['brand'];
  locale: Locale;
  onSkip: () => void;
}) {
  return (
    <div className="intro-screen">
      <div className="intro-grain" />
      <div className="intro-content">
        <span className="intro-overline">
          {locale === 'ar'
            ? `تأسس ${brand.foundedYear} · ${brand.location}`
            : `EST. ${brand.foundedYear} · ${brand.location}`}
        </span>
        <span className="intro-logo">{brand.logoText || 'A'}</span>
        <span className="intro-name">{brand.englishName}</span>
        <span className="intro-tagline">{brand.intro}</span>
      </div>
      <button className="intro-skip" onClick={onSkip}>
        {locale === 'ar' ? 'تخطي' : 'Skip'} <ArrowLeft size={14} />
      </button>
    </div>
  );
}

function SectionHeading({
  index,
  title,
  subtitle,
  action,
}: {
  index: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="heading-copy">
        <div className="section-kicker">
          <span className="number dir-ltr-num">{index}</span>
          <span className="kicker-rule" />
          <span>{document.documentElement.lang === 'en' ? 'SELECTED WORK' : 'مختارات التصميم'}</span>
        </div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="heading-action">{action}</div>
    </div>
  );
}

function ProjectCard({
  project,
  category,
  onOpen,
}: {
  project: Project;
  category: string;
  onOpen: () => void;
}) {
  const english = document.documentElement.lang === 'en';
  return (
    <article className="project-card">
      <button
        className="project-image-button"
        onClick={onOpen}
        aria-label={`${english ? 'Zoom image' : 'تكبير صورة'} ${project.title}`}
      >
        <img src={project.image} alt={project.title} />
        <span className="image-hover">
          {english ? 'Zoom' : 'تكبير'} <MoveUpRight size={16} />
        </span>
      </button>
      <div className="project-meta">
        <span>
          {category} · <span className="dir-ltr-num">{project.year}</span>
        </span>
        <span>{project.location}</span>
      </div>
      <div className="project-title-row">
        <h3>{project.title}</h3>
        <button onClick={onOpen} aria-label={`${english ? 'View' : 'عرض'} ${project.title}`}>
          <ArrowUpLeft size={17} />
        </button>
      </div>
      <p>{project.description}</p>
    </article>
  );
}

function MaterialCard({
  material,
  onOpen,
}: {
  material: Material;
  onOpen: () => void;
}) {
  const english = document.documentElement.lang === 'en';
  return (
    <article className="material-card">
      <button
        onClick={onOpen}
        className="material-image"
        aria-label={`${english ? 'Zoom material' : 'تكبير خامة'} ${material.name}`}
      >
        <img src={material.image} alt={material.name} />
        <span className={`material-swatch ${material.tone}`} />
      </button>
      <div className="material-info">
        <span>{material.type}</span>
        <h3>{material.name}</h3>
        <p>{material.note}</p>
        <button className="material-more" onClick={onOpen}>
          {english ? 'View details' : 'عرض التفاصيل'} <ArrowLeft size={15} />
        </button>
      </div>
    </article>
  );
}

function Drawer({
  data,
  locale,
  onClose,
  onJump,
}: {
  data: SiteData;
  locale: Locale;
  onClose: () => void;
  onJump: (id: string) => void;
}) {
  const t = (key: keyof NonNullable<SiteData['ui']>, fallback: string) =>
    ui(data, locale, key, fallback);
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-top">
          <span className="brand-mark">
            {data.brand.logoImage ? (
              <img src={data.brand.logoImage} alt={data.brand.name} />
            ) : (
              data.brand.logoText || 'A'
            )}
          </span>
          <button onClick={onClose} aria-label={t('close', 'إغلاق')}>
            <X size={22} />
          </button>
        </div>
        <div className="drawer-main">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            {t('menu', 'تنقّل')}
          </span>
          <button onClick={() => onJump('about')}>
            {t('about', 'عن الاستوديو')} <ArrowLeft size={18} />
          </button>
          <button onClick={() => onJump('projects')}>
            {t('projects', 'المشاريع')} <ArrowLeft size={18} />
          </button>
          <button onClick={() => onJump('lookbook')}>
            {t('lookbook', 'قاموس الخامات')} <ArrowLeft size={18} />
          </button>
          <button onClick={() => onJump('process')}>
            {t('process', 'منهج التنفيذ')} <ArrowLeft size={18} />
          </button>
          <button onClick={() => onJump('contact')}>
            {t('contactUs', 'تواصل معنا')} <ArrowLeft size={18} />
          </button>
        </div>
        <div className="drawer-bottom">
          <span>{data.contact.address}</span>
          <a
            href={whatsappUrl(
              data.contact.whatsapp,
              locale === 'ar' ? 'مرحباً، أود التواصل معكم.' : 'Hello, I would like to contact you.',
            )}
            target="_blank"
            rel="noreferrer"
          >
            {t('whatsapp', 'واتساب')} <ArrowUpLeft size={15} />
          </a>
        </div>
      </aside>
    </div>
  );
}

function Lightbox({
  item,
  locale,
  onClose,
}: {
  item: Project | Material;
  locale: Locale;
  onClose: () => void;
}) {
  const title = 'title' in item ? item.title : item.name;
  return (
    <div className="lightbox" onClick={onClose}>
      <button
        onClick={onClose}
        className="lightbox-close"
        aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
      >
        <X size={24} />
      </button>
      <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
        <img src={item.image} alt={title} />
        <div className="lightbox-caption">
          <span>
            {'categoryId' in item ? (locale === 'ar' ? 'مشروع' : 'Project') : item.type}
          </span>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
}

function CalculatorModal({
  data,
  locale,
  onClose,
}: {
  data: SiteData;
  locale: Locale;
  onClose: () => void;
}) {
  const [area, setArea] = useState(180);
  const [packageId, setPackageId] = useState(data.packages[1]?.id ?? data.packages[0]?.id);
  const selected = data.packages.find((item) => item.id === packageId) ?? data.packages[0];
  const total = Math.max(0, area) * (selected?.price ?? 0);
  
  // فرض الأرقام الإنجليزية دائماً في حاسبة التكلفة
  const formatted = new Intl.NumberFormat('en-US').format(total);
  const t = (key: keyof NonNullable<SiteData['ui']>, fallback: string) =>
    ui(data, locale, key, fallback);
  const whatsappText = `مرحباً ${data.brand.name}، أرغب في طلب تقدير مبدئي.\nالمساحة: ${area} م²\nالباقة: ${selected?.name}\nالتقدير التقريبي: ${formatted} ريال`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="calculator-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="إغلاق">
          <X size={21} />
        </button>
        <div className="modal-intro">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            {t('preliminary', 'تقدير أولي')}
          </span>
          <h2>
            {t('measureDream', 'لنقيس الحلم\nبشكل أقرب.')
              .split('\n')
              .map((line, index) => (
                <span key={line + index}>
                  {index > 0 && <br />}
                  <em>{line}</em>
                </span>
              ))}
          </h2>
          <p>
            {locale === 'ar'
              ? 'أدخل المساحة واعرف التكلفة التقديرية لمشروعك.'
              : 'Enter the area and choose the level of care that fits your project.'}
          </p>
        </div>
        <div className="calc-controls">
          <label>
            {t('area', 'المساحة بالمتر المربع')}{' '}
            <strong className="dir-ltr-num">{area} م²</strong>
          </label>
          <input
            type="range"
            min="30"
            max="1000"
            step="10"
            value={area}
            onChange={(event) => setArea(Number(event.target.value))}
          />
          <div className="range-labels dir-ltr-num">
            <span>30 م²</span>
            <span>1000 م²</span>
          </div>
          <label>{t('choosePackage', 'اختر الباقة')}</label>
          <div className="package-options">
            {data.packages.map((pkg) => (
              <button
                key={pkg.id}
                className={
                  packageId === pkg.id ? 'package-option active' : 'package-option'
                }
                onClick={() => setPackageId(pkg.id)}
              >
                <span>{pkg.name}</span>
                <small className="dir-ltr-num">
                  {new Intl.NumberFormat('en-US').format(pkg.price)} ريال / م²
                </small>
                {packageId === pkg.id && <Check size={16} />}
              </button>
            ))}
          </div>
        </div>
        <div className="calc-total">
          <span>{t('estimate', 'التقدير المبدئي')}</span>
          <strong className="dir-ltr-num">
            {formatted} <small>ريال</small>
          </strong>
          <a
            className="button button-dark"
            href={`https://wa.me/${data.contact.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noreferrer"
          >
            {t('sendWhatsapp', 'اعتمد المقايسة عبر واتساب')} <Send size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

function whatsappUrl(number: string, message: string) {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

export default App;
