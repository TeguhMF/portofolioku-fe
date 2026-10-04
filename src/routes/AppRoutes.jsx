/*dikaa*/
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardContainer from '../pages/dashboard/DashboardContainer';
import ProfileTab from '../pages/dashboard/ProfileTab';

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
        {/* Sub-routes di dalam Split View Container */}
        <Route element={<DashboardContainer />}>
          <Route index element={<ProfileTab />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="organizations" element={<div className="p-6 bg-white rounded-2xl border">Form Organisasi (Next)</div>} />
          <Route path="achievements" element={<div className="p-6 bg-white rounded-2xl border">Form Prestasi (Next)</div>} />
          <Route path="projects" element={<div className="p-6 bg-white rounded-2xl border">Form Karya (Next)</div>} />
          <Route path="skills" element={<div className="p-6 bg-white rounded-2xl border">Form Skill (Next)</div>} />
          <Route path="templates" element={<div className="p-6 bg-white rounded-2xl border">Pilih Template (Next)</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;