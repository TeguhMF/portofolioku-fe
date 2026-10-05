import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardContainer from '../pages/Dashboard/DashboardContainer';
import ProfileTab from '../pages/Dashboard/ProfileTab';
import OrganizationsTab from '../pages/dashboard/OrganizationsTab';
import AchievementsTab from '../pages/Dashboard/AchievementsTab';
import ProjectsTab from '../pages/dashboard/ProjectsTab';
import SkillsTab from '../pages/dashboard/SkillsTab';
import TemplatesTab from '../pages/dashboard/TemplatesTab';
import PublicPortfolio from '../pages/PublicPortfolio';

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
        {/* Split View Container & Form Tabs */}
        <Route element={<DashboardContainer />}>
          <Route index element={<ProfileTab />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="organizations" element={<OrganizationsTab />} />
          <Route path="achievements" element={<AchievementsTab />} />
          <Route path="projects" element={<ProjectsTab />} />
          <Route path="skills" element={<SkillsTab />} />
          <Route path="templates" element={<TemplatesTab />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;