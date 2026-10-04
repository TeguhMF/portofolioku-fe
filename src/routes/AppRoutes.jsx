import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../layouts/DashboardLayout';

// Placeholder Komponen Halaman Internal Sementara
const Overview = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <h1 className="text-xl font-bold text-slate-800 mb-2">Halaman Overview Dashboard</h1>
    <p className="text-xs text-slate-500">Nanti di sini ada Progress Bar % dan Stat Cards.</p>
  </div>
);

const PublicPortfolio = () => <div className="p-8 text-2xl font-bold">Halaman Portofolio Publik (/p/:username)</div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/p/:username" element={<PublicPortfolio />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="profile" element={<div className="p-4 bg-white rounded-xl">Tab Profil & Akademik</div>} />
        <Route path="organizations" element={<div className="p-4 bg-white rounded-xl">Tab Organisasi & Ekskul</div>} />
        <Route path="achievements" element={<div className="p-4 bg-white rounded-xl">Tab Prestasi & Sertifikat</div>} />
        <Route path="projects" element={<div className="p-4 bg-white rounded-xl">Tab Karya & Project</div>} />
        <Route path="skills" element={<div className="p-4 bg-white rounded-xl">Tab Keahlian & Cita-cita</div>} />
        <Route path="templates" element={<div className="p-4 bg-white rounded-xl">Tab Pilih Template</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;