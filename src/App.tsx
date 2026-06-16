import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VisitorTracker from './components/VisitorTracker';
import HomePage from './pages/HomePage';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <VisitorTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;