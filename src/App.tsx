import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VisitorTracker from "./components/VisitorTracker";
import HomePage from "./pages/HomePage";

// Lazy load the Dashboard to reduce initial bundle size
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

function App() {
  return (
    <BrowserRouter>
      <VisitorTracker />
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
