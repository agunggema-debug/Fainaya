interface HeroProps {
  t: (key: string) => string;
}

export default function Hero({ t }: HeroProps) {
  return (
    <section id="home" className="hero-bg min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl">
          <div className="animate-[fadeInUp_0.6s_ease_forwards]" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>{t('hero_badge')}</span>
            </span>
          </div>

          <h1 className="animate-[fadeInUp_0.6s_ease_forwards] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <span>{t('hero_title_1')} </span>
            <span className="gradient-text-light">{t('hero_title_2')} </span>
            <span>{t('hero_title_3')} </span>
            <span className="gradient-text-light">{t('hero_title_4')}</span>
          </h1>

          <p className="animate-[fadeInUp_0.6s_ease_forwards] text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed" style={{ animationDelay: '0.3s', opacity: 0 }}>
            {t('hero_subtitle')}
          </p>

          <div className="animate-[fadeInUp_0.6s_ease_forwards] flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2 bg-brand-coral text-white px-8 py-4 rounded-full text-base font-semibold" onClick={handleScroll('contact')}>
              <span>{t('hero_cta_primary')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a href="#services" className="btn-outline inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/5" onClick={handleScroll('services')}>
              <span>{t('hero_cta_secondary')}</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="animate-[fadeInUp_0.6s_ease_forwards] mt-16 flex flex-wrap items-center gap-8 text-slate-500" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-coral" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">{t('trust_1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{t('trust_2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{t('trust_3')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
}

function handleScroll(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };
}