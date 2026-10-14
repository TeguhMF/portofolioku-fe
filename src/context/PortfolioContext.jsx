import { createContext, useContext, useState, useEffect } from 'react';

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
    builderSettings: {
      template: 'modern',       // 'modern', 'minimalist', 'creative'
      accentColor: 'blue',      // 'blue', 'purple', 'emerald', 'amber'
      fontFamily: 'sans',       // 'sans', 'serif', 'mono'
      sectionOrder: ['skills', 'achievements', 'organizations', 'projects'],
      isDraft: true,
    }
  });

  // Load data dari localStorage jika ada
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_master_data');
    if (saved) {
      try {
        setPortfolioData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveToLocalStorage = (newData) => {
    setPortfolioData(newData);
    localStorage.setItem('portfolio_master_data', JSON.stringify(newData));
  };

  const updateProfile = (newProfile) => {
    const updated = { ...portfolioData, profile: { ...portfolioData.profile, ...newProfile } };
    saveToLocalStorage(updated);
  };

  const updateBuilderSettings = (newSettings) => {
    const updated = { 
      ...portfolioData, 
      builderSettings: { ...portfolioData.builderSettings, ...newSettings } 
    };
    saveToLocalStorage(updated);
  };

  const addAchievement = (item) => {
    const updated = { ...portfolioData, achievements: [...portfolioData.achievements, { ...item, id: Date.now() }] };
    saveToLocalStorage(updated);
  };
  const removeAchievement = (id) => {
    const updated = { ...portfolioData, achievements: portfolioData.achievements.filter((a) => a.id !== id) };
    saveToLocalStorage(updated);
  };

  const addOrganization = (item) => {
    const updated = { ...portfolioData, organizations: [...portfolioData.organizations, { ...item, id: Date.now() }] };
    saveToLocalStorage(updated);
  };
  const removeOrganization = (id) => {
    const updated = { ...portfolioData, organizations: portfolioData.organizations.filter((o) => o.id !== id) };
    saveToLocalStorage(updated);
  };

  const addProject = (item) => {
    const updated = { ...portfolioData, projects: [...portfolioData.projects, { ...item, id: Date.now() }] };
    saveToLocalStorage(updated);
  };
  const removeProject = (id) => {
    const updated = { ...portfolioData, projects: portfolioData.projects.filter((p) => p.id !== id) };
    saveToLocalStorage(updated);
  };

  const addSkill = (item) => {
    const updated = { ...portfolioData, skills: [...portfolioData.skills, { ...item, id: Date.now() }] };
    saveToLocalStorage(updated);
  };
  const removeSkill = (id) => {
    const updated = { ...portfolioData, skills: portfolioData.skills.filter((s) => s.id !== id) };
    saveToLocalStorage(updated);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updateProfile,
        updateBuilderSettings,
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

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio harus di dalam <PortfolioProvider>');
  return context;
};