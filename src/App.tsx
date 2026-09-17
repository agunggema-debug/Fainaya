import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisitorTracker from "./components/VisitorTracker";
import HomePage from "./pages/HomePage";
import { ADMIN_MODUL_ROUTES } from "./data/adminModules";

// Lazy load admin pages
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AktivitasTerkini = lazy(() => import("./pages/admin/AktivitasTerkini"));
const DaftarPelanggan = lazy(() => import("./pages/admin/DaftarPelanggan"));
const LogAktivitas = lazy(() => import("./pages/admin/pelanggan/LogAktivitas"));
const SecurityPolicy = lazy(() => import("./pages/SecurityPolicy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminBlog = lazy(() => import("./pages/admin/Blog"));
// Halaman generik untuk modul admin (servis, maintenance, development, desain,
// kreasi, inventaris, keuangan, integrasi, pengaturan, admin, notifikasi)
const ModulAdmin = lazy(() => import("./pages/admin/ModulAdmin"));

function App() {
  return (
    <BrowserRouter>
      <VisitorTracker />
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/aktivitas" element={<AktivitasTerkini />} />
          <Route path="/admin/pelanggan" element={<DaftarPelanggan />} />
          <Route path="/admin/pelanggan/aktivitas" element={<LogAktivitas />} />
          <Route path="/security" element={<SecurityPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          {ADMIN_MODUL_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={<ModulAdmin path={route.path} />} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
