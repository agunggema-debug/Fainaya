interface ServicesProps {
  t: (key: string) => string;
}

export default function Services({ t }: ServicesProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-brand-coral font-semibold text-sm tracking-wider uppercase mb-3">{t('services_badge')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            <span>{t('services_title_1')} </span>
            <span className="gradient-text">{t('services_title_2')}</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">{t('services_subtitle')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* IT Services */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-10 text-white card-hover">
            <div className="w-14 h-14 bg-brand-blue/20 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('it_title')}</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">{t('it_subtitle')}</p>
            <div className="space-y-4">
              {[
                { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", titleKey: 'it_1_title', descKey: 'it_1_desc' },
                { icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2", titleKey: 'it_2_title', descKey: 'it_2_desc' },
                { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", titleKey: 'it_3_title', descKey: 'it_3_desc' },
                { icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4", titleKey: 'it_4_title', descKey: 'it_4_desc' },
              ].map((item) => (
                <div key={item.titleKey} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t(item.titleKey)}</h4>
                    <p className="text-sm text-slate-400">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creative & Arts */}
          <div className="bg-gradient-to-br from-brand-coral to-orange-500 rounded-3xl p-8 md:p-10 text-white card-hover">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">{t('creative_title')}</h3>
            <p className="text-orange-100 mb-8 leading-relaxed">{t('creative_subtitle')}</p>
            <div className="space-y-4">
              {[
                { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", titleKey: 'creative_1_title', descKey: 'creative_1_desc' },
                { icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", titleKey: 'creative_2_title', descKey: 'creative_2_desc' },
                { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", titleKey: 'creative_3_title', descKey: 'creative_3_desc' },
                { icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 003 15.546M12 3v2m0 4v2m0 4v2m0 4v2", titleKey: 'creative_4_title', descKey: 'creative_4_desc' },
              ].map((item) => (
                <div key={item.titleKey} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t(item.titleKey)}</h4>
                    <p className="text-sm text-orange-100">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}