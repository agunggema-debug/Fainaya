import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  t: (key: string) => string;
  lang: string;
  setLanguage: (lang: 'en' | 'id' | 'zh') => void;
  user: { name?: string; email?: string } | null;
  loading: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Navbar({ t, lang, setLanguage, user, loading, onLoginClick, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const scrollTo = (id: string) => {
    closeMobile();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  const langBtn = (l: 'en' | 'id' | 'zh', label: string) => (
    <button
      onClick={() => setLanguage(l)}
      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105 ${
        lang === l ? 'bg-gradient-to-r from-brand-blue to-brand-coral text-white' : 'text-slate-500'
      }`}
    >
      {label}
    </button>
  );

  const navLinks = [
    { href: 'home', key: 'nav_home' },
    { href: 'services', key: 'nav_services' },
    { href: 'about', key: 'nav_about' },
    { href: 'contact', key: 'nav_contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src="/img/logo.png" alt="Fainaya Logo" className="h-10 w-auto rounded-lg" />
            <span className={`text-lg sm:text-xl font-bold ${scrolled ? 'text-slate-900' : 'text-white'}`}>Fainaya</span>
          </a>

          {/* Center: Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-brand-blue' : 'text-white/80 hover:text-white'}`}
              >
                {t(link.key)}
              </button>
            ))}
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-600 hover:text-brand-blue' : 'text-white/80 hover:text-white'}`}
            >
              {t('nav_blog')}
            </Link>
          </div>

          {/* Right: Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200">
              {langBtn('en', 'EN')}
              {langBtn('id', 'ID')}
              {langBtn('zh', '中')}
            </div>

            {/* Auth button */}
            {loading ? (
              <div className="w-9 h-9 rounded-full bg-slate-200 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <a
                  href="/admin/dashboard"
                  className={`text-xs font-medium transition-colors ${
                    scrolled ? 'text-brand-blue hover:text-brand-blue/80' : 'text-green-400 hover:text-green-300'
                  }`}
                >
                  {user.name || user.email}
                </a>
                <a
                  href="/admin/dashboard"
                  className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                  title="Dashboard"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </a>
                <button
                  onClick={onLogout}
                  className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center hover:bg-brand-blue/80 transition-colors"
                  title="Logout"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 ${
                  scrolled
                    ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Login
              </button>
            )}

            <button onClick={() => scrollTo('contact')} className="inline-flex items-center gap-2 bg-brand-coral text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:translate-y-[-2px] hover:shadow-lg hover:shadow-brand-coral/40 transition-all">
              {t('nav_cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>

          {/* Mobile: Language + Auth icon + Hamburger */}
          <div className="flex items-center gap-1.5 md:hidden">
            <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 scale-90 origin-right">
              {langBtn('en', 'EN')}
              {langBtn('id', 'ID')}
              {langBtn('zh', '中')}
            </div>

            {/* Mobile auth icon (compact) */}
            {!loading && (
              user ? (
                <button
                  onClick={onLogout}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${scrolled ? 'bg-brand-blue' : 'bg-white/10 border border-white/20'}`}
                  title="Logout"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${scrolled ? 'bg-brand-blue' : 'bg-white/10 border border-white/20'}`}
                  title="Login"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              )
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-1.5 w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100/10 transition-all ${scrolled ? 'text-slate-700' : 'text-white'}`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40" onClick={closeMobile} />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-white shadow-2xl transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-900">Menu</span>
            <button onClick={closeMobile} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Mobile user info when logged in */}
          {user && (
            <div className="px-6 pt-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white text-sm font-bold">
                  {(user.name || user.email || '?').charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{user.name || 'User'}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 p-6">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="group flex items-center gap-3 text-lg font-semibold text-slate-700 hover:text-brand-blue transition-all"
                style={{ animationDelay: `${0.05 * (i + 1)}s`, opacity: mobileOpen ? 1 : 0 }}
              >
                <span className="w-1 h-6 bg-brand-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {t(link.key)}
              </button>
            ))}
            <Link
              to="/blog"
              onClick={closeMobile}
              className="group flex items-center gap-3 text-lg font-semibold text-slate-700 hover:text-brand-blue transition-all"
            >
              <span className="w-1 h-6 bg-brand-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              {t('nav_blog')}
            </Link>
          </div>

          <div className="mt-auto p-6 border-t border-slate-100 space-y-3">
            {/* Mobile login/logout button */}
            {user ? (
              <button
                onClick={() => { closeMobile(); onLogout(); }}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3.5 rounded-2xl font-semibold hover:bg-red-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            ) : (
              <button
                onClick={() => { closeMobile(); onLoginClick(); }}
                className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Login / Register
              </button>
            )}
            <button onClick={() => { closeMobile(); scrollTo('contact'); }} className="w-full bg-brand-coral text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-coral/20">
              {t('nav_cta')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}