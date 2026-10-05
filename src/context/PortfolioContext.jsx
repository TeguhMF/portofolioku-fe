import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    profile: {
      name: 'Muhammad Fajar',
      username: 'fajar12',
      school_name: 'SMAN 1 Jakarta',
      grade_level: 'XII IPA 1',
      nisn: '0051234567',
      bio: 'Siswa SMA yang berdedikasi di bidang teknologi dan sains.',
      career_goal: 'Data Scientist & Tech Entrepreneur',
      phone_whatsapp: '081234567890',
      social_links: { instagram: 'fajar_tech', linkedin: 'muhammad-fajar', github: 'fajar12-code' },
      selected_theme: 'academic',
    },
    achievements: [
      { id: 1, title: 'Juara 1 Lomba LKTI', rank: 'Juara 1', level: 'nasional', year: '2026', description: 'Penelitian IoT.' },
    ],
    organizations: [
      { id: 1, organization_name: 'OSIS SMAN 1 Jakarta', role: 'Ketua Sekbid IPTEK', start_year: '2025', end_year: '2026', description: 'Program kerja digitalisasi.' },
    ],
    projects: [
      { id: 1, title: 'Aplikasi Absensi Web', category: 'teknologi', description: 'Sistem absensi QR Code.', project_url: 'https://github.com' },
    ],
    skills: [
      { id: 1, skill_name: 'Public Speaking', category: 'soft_skill' },
      { id: 2, skill_name: 'Python', category: 'hard_skill' },
    ],
  });

  const updateProfile = (newProfile) => {
    setPortfolioData((prev) => ({ ...prev, profile: { ...prev.profile, ...newProfile } }));
  };

  // Handler Skills
  const addSkill = (item) => {
    setPortfolioData((prev) => ({ ...prev, skills: [...prev.skills, { ...item, id: Date.now() }] }));
  };
  const removeSkill = (id) => {
    setPortfolioData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  // Handler Theme
  const setTheme = (themeName) => {
    setPortfolioData((prev) => ({ ...prev, profile: { ...prev.profile, selected_theme: themeName } }));
  };

  // Handlers lainnya (Achievements, Organizations, Projects)
  const addAchievement = (item) => {
    setPortfolioData((prev) => ({ ...prev, achievements: [...prev.achievements, { ...item, id: Date.now() }] }));
  };
  const removeAchievement = (id) => {
    setPortfolioData((prev) => ({ ...prev, achievements: prev.achievements.filter((a) => a.id !== id) }));
  };
  const addOrganization = (item) => {
    setPortfolioData((prev) => ({ ...prev, organizations: [...prev.organizations, { ...item, id: Date.now() }] }));
  };
  const removeOrganization = (id) => {
    setPortfolioData((prev) => ({ ...prev, organizations: prev.organizations.filter((o) => o.id !== id) }));
  };
  const addProject = (item) => {
    setPortfolioData((prev) => ({ ...prev, projects: [...prev.projects, { ...item, id: Date.now() }] }));
  };
  const removeProject = (id) => {
    setPortfolioData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updateProfile,
        addAchievement,
        removeAchievement,
        addOrganization,
        removeOrganization,
        addProject,
        removeProject,
        addSkill,
        removeSkill,
        setTheme,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio harus di dalam <PortfolioProvider>');
  return context;
};