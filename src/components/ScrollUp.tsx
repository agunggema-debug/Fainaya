import { useState, useEffect } from 'react';

export default function ScrollUp() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(144.5);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setVisible(currentScroll > 300);
      setProgress(144.5 - (currentScroll * 144.5) / (scrollTotal || 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="scrollUp"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-24 md:bottom-8 md:right-28 w-12 h-12 bg-white border border-slate-200 text-slate-900 rounded-full shadow-lg flex items-center justify-center z-[10000] hover:bg-brand-blue hover:text-white hover:border-brand-blue group focus:outline-none transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-100 opacity-0 group-hover:opacity-20" />
        <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-blue" style={{ strokeDasharray: '144.5', strokeDashoffset: progress }} />
      </svg>
      <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
    </button>
  );
}