import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor, getSessionId } from '../data/visitorTracker';

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    // Initialize session ID
    getSessionId();
    // Track page visit to Supabase (with localStorage fallback)
    trackVisitor(location.pathname + location.hash);
  }, [location]);

  return null; // This component doesn't render anything
}