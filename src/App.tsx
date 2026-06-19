import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisitorTracker from "./components/VisitorTracker";
import HomePage from "./pages/HomePage";

// Lazy load admin pages
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AktivitasTerkini = lazy(() => import("./pages/admin/AktivitasTerkini"));

function App() {
  return (
    <BrowserRouter>
      <VisitorTracker />
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/aktivitas" element={<AktivitasTerkini />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
