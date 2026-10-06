import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    profile: {
      name: '',
      username: '',
      school_name: '',
      grade_level: '',
      nisn: '',
      bio: '',
      career_goal: '',
      phone_whatsapp: '',
      avatar_url: '',
      social_links: { instagram: '', linkedin: '', github: '' },
    },
    achievements: [],
    organizations: [],
    projects: [],
    skills: [],
  });

  const updateProfile = (newProfile) => {
    setPortfolioData((prev) => ({ ...prev, profile: { ...prev.profile, ...newProfile } }));
  };

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

  const addSkill = (item) => {
    setPortfolioData((prev) => ({ ...prev, skills: [...prev.skills, { ...item, id: Date.now() }] }));
  };
  const removeSkill = (id) => {
    setPortfolioData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
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