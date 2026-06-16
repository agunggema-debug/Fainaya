import { useRef } from 'react';

interface ContactProps {
  t: (key: string) => string;
}

export default function Contact({ t }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const getField = (key: string, fallback = '') => {
      const val = formData.get(key);
      return typeof val === 'string' ? val : fallback;
    };
    const userName = getField('name', 'a customer');
    const email = getField('email');
    const phone = getField('phone');
    const service = getField('service');
    const message = getField('message');

    let msg = `Hello Fainaya! I'm ${userName}.%0AEmail: ${email}%0A`;
    if (phone.trim()) msg += `Phone: ${phone}%0A`;
    msg += `Service: ${service}%0AMessage: ${message}`;

    window.open(`https://wa.me/6281398920798?text=${msg}`, '_blank');
    formRef.current?.reset();
    alert(t('alert_submit'));
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-brand-coral font-semibold text-sm tracking-wider uppercase mb-3">{t('contact_badge')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            <span>{t('contact_title_1')} </span>
            <span className="gradient-text">{t('contact_title_2')}</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">{t('contact_subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">{t('form_name')}</label>
                  <input type="text" id="name" name="name" required placeholder={t('placeholder_name')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">{t('form_email')}</label>
                  <input type="email" id="email" name="email" required placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-sm" />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">{t('form_phone')}</label>
                <input type="tel" id="phone" name="phone" placeholder="+62 xxx-xxxx-xxxx"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-sm" />
              </div>
              <div className="mb-5">
                <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">{t('form_service')}</label>
                <select id="service" name="service" required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-sm appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  defaultValue="">
                  <option value="" disabled>{t('form_service_default')}</option>
                  <option value="computer-repair">{t('opt_computer_repair')}</option>
                  <option value="networking">{t('opt_networking')}</option>
                  <option value="system-development">{t('opt_system_dev')}</option>
                  <option value="technical-support">{t('opt_tech_support')}</option>
                  <option value="digital-design">{t('opt_digital_design')}</option>
                  <option value="video-editing">{t('opt_video_editing')}</option>
                  <option value="creative-projects">{t('opt_creative_projects')}</option>
                  <option value="handmade">{t('opt_handmade')}</option>
                  <option value="other">{t('opt_other')}</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">{t('form_message')}</label>
                <textarea id="message" name="message" rows={4} required placeholder={t('placeholder_message')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full bg-brand-coral text-white px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
                <span>{t('form_submit')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <a href="https://wa.me/6281398920798?text=Hello%20Fainaya!%20I'm%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer"
              className="bg-green-50 border border-green-100 rounded-2xl p-6 flex items-center gap-4 card-hover group">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-green-700">{t('whatsapp_title')}</div>
                <div className="text-sm text-green-600">{t('whatsapp_desc')}</div>
              </div>
            </a>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-blue-700">{t('email_title')}</div>
                <div className="text-sm text-blue-600">fainaya.service.art@gmail.com</div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-coral rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-orange-700">{t('location_title')}</div>
                <div className="text-sm text-orange-600">{t('location_value')}</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-bold text-slate-700">{t('hours_title')}</span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{t('hours_weekday')}</span>
                  <span className="font-medium text-slate-800">16:00 PM – 20:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('hours_weekend')}</span>
                  <span className="font-medium text-slate-800">14:00 PM – 20:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}