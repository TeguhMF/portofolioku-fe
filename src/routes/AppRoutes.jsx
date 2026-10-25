import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import OverviewTab from '../pages/Dashboard/OverviewTab';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardContainer from '../pages/Dashboard/DashboardContainer';
import ProfileTab from '../pages/Dashboard/ProfileTab';
import OrganizationsTab from '../pages/Dashboard/OrganizationsTab';
import AchievementsTab from '../pages/Dashboard/AchievementsTab';
import ProjectsTab from '../pages/Dashboard/ProjectsTab';
import SkillsTab from '../pages/Dashboard/SkillsTab';
import PublicPortfolio from '../pages/PublicPortfolio';
import ResetPassword from '../pages/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
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
        <Route element={<DashboardContainer />}>
          <Route index element={<OverviewTab />} />
          <Route path="overview" element={<OverviewTab />} />
        </Route>
        <Route element={<DashboardContainer />}>
          <Route path="profile" element={<ProfileTab />} />
          <Route path="organizations" element={<OrganizationsTab />} />
          <Route path="achievements" element={<AchievementsTab />} />
          <Route path="projects" element={<ProjectsTab />} />
          <Route path="skills" element={<SkillsTab />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;