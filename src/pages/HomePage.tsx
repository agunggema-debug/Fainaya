import { useI18n } from '../hooks/useI18n';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ScrollUp from '../components/ScrollUp';
import AuthModal from '../components/AuthModal';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { lang, t, setLanguage } = useI18n();
  const { user, loading, login, register, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/admin/dashboard');
  };

  return (
    <>
      <Navbar
        t={t}
        lang={lang}
        setLanguage={setLanguage}
        user={user}
        loading={loading}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={logout}
      />
      <Hero t={t} />
      <Services t={t} />
      <About t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <Chatbot lang={lang} />
      <ScrollUp />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={login}
        onRegister={register}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
