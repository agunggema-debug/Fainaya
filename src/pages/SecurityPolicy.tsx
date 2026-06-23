import { useI18n } from "../hooks/useI18n";
import { Link } from "react-router-dom";

const SecurityPolicy = () => {
  const { t } = useI18n();
  return (
    <section className="pt-32 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-blue transition-colors mb-6 group">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t("sec_back")}</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            <span className="gradient-text">{t("sec_title_1")}</span> {t("sec_title_2")}
          </h1>
          <p className="text-lg text-slate-600">{t("sec_subtitle")}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-10">
          {/* Intro */}
          <p className="text-slate-600 leading-relaxed">{t("sec_intro")}</p>

          {/* 1. Pengelolaan Data */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue text-sm font-bold">1</span>
              <span>{t("sec_s1_title")}</span>
            </h2>
            <div className="space-y-4 ml-10">
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{t("sec_s1_h1")}</h3>
                <p className="text-slate-600 leading-relaxed">{t("sec_s1_d1")}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{t("sec_s1_h2")}</h3>
                <p className="text-slate-600 leading-relaxed">{t("sec_s1_d2")}</p>
              </div>
            </div>
          </div>

          {/* 2. Standar Teknis */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue text-sm font-bold">2</span>
              <span>{t("sec_s2_title")}</span>
            </h2>
            <p className="text-slate-600 leading-relaxed ml-10 mb-4">{t("sec_s2_intro")}</p>
            <div className="space-y-4 ml-10">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{t(`sec_s2_h${num}`)}</h3>
                    <p className="text-slate-600 leading-relaxed">{t(`sec_s2_d${num}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Pelaporan Kerentanan */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-coral/10 rounded-lg flex items-center justify-center text-brand-coral text-sm font-bold">3</span>
              <span>{t("sec_s3_title")}</span>
            </h2>
            <p className="text-slate-600 leading-relaxed ml-10 mb-4">{t("sec_s3_desc")}</p>
            <div className="ml-10 bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-slate-800">
                  {t("sec_s3_email_label")}{" "}
                  <a href="mailto:fainaya.service.art@gmail.com" className="text-blue-700 hover:underline">
                    fainaya.service.art@gmail.com
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-semibold text-slate-800">
                  {t("sec_s3_subject_label")} <span className="text-slate-600 font-normal">{t("sec_s3_subject_value")}</span>
                </span>
              </div>
            </div>
          </div>

          {/* 4. Kepatuhan */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue text-sm font-bold">4</span>
              <span>{t("sec_s4_title")}</span>
            </h2>
            <p className="text-slate-600 leading-relaxed ml-10">{t("sec_s4_desc")}</p>
          </div>

          {/* Last Updated */}
          <div className="border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-600 italic">{t("sec_last_updated")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityPolicy;
