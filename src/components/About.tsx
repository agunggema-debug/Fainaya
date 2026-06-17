interface AboutProps {
  t: (key: string) => string;
}

export default function About({ t }: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-28 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-brand-coral font-semibold text-sm tracking-wider uppercase mb-3">{t('about_badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              <span>{t('about_title_1')} </span>
              <span className="gradient-text">{t('about_title_2')}</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">{t('about_p1')}</p>
            <p className="text-slate-600 leading-relaxed mb-8">{t('about_p2')}</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-brand-coral mb-1">100+</div>
                <div className="text-sm text-slate-500 font-medium">{t('stat_projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-brand-blue mb-1">50+</div>
                <div className="text-sm text-slate-500 font-medium">{t('stat_clients')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-brand-coral mb-1">24/7</div>
                <div className="text-sm text-slate-500 font-medium">{t('stat_support')}</div>
              </div>
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center min-h-[140px]">
                  <svg className="w-10 h-10 text-brand-blue mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-sm font-semibold">{t('card_tech')}</span>
                </div>
                <div className="bg-gradient-to-br from-brand-coral to-orange-500 rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center min-h-[140px]">
                  <svg className="w-10 h-10 text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span className="text-sm font-semibold">{t('card_creative')}</span>
                </div>
              </div>
              <div className="mt-4 bg-brand-light rounded-2xl p-6 text-center">
                <p className="text-sm text-slate-500 italic leading-relaxed">{t('card_quote')}</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-blue/10 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-coral/10 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}