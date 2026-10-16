import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const PortfolioContext = createContext(null);

const initialPortfolioState = {
  profile: {
    name: '',
    username: '',
    school_name: '',
    grade_level: '',
    career_goal: '',
    bio: '',
    phone_whatsapp: '',
    avatar_url: '',
    social_links: { instagram: '', linkedin: '', github: '' },
  },
  achievements: [],
  organizations: [],
  projects: [],
  skills: [],
  builder_settings: {},
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(initialPortfolioState);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );

  const fetchPortfolio = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (!token || token === 'null' || token === 'undefined') {
      setIsAuthenticated(false);
      setPortfolioData(initialPortfolioState);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get('/portfolio');
      const data = response.data?.data || response.data;

      if (data) {
        setPortfolioData({
          profile: data.profile || initialPortfolioState.profile,
          achievements: Array.isArray(data.achievements) ? data.achievements : [],
          organizations: Array.isArray(data.organizations) ? data.organizations : [],
          projects: Array.isArray(data.projects) ? data.projects : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          builder_settings: data.builderSettings || data.builder_settings || {},
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error saat fetch portfolio:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setPortfolioData(initialPortfolioState);
      }
    } finally {
      setLoading(false);
    }
  }, []);

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPortfolio();
  }, []);
  
  const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    const resData = response.data?.data || response.data;
    const token = resData.access_token || resData.token || response.data.access_token || response.data.token;
    const user = resData.user || response.data.user;

    if (token) {
      localStorage.setItem('token', token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      setIsAuthenticated(true);

      // Dibungkus try-catch agar jika API gagal, proses navigasi login tidak crash
      try {
        await fetchPortfolio();
      } catch (e) {
        console.warn('Gagal memuat data awal portofolio:', e);
      }
    }
    return user;
  };

  const register = async (userData) => {
    const response = await api.post('/register', userData);
    const resData = response.data?.data || response.data;
    const token = resData.access_token || resData.token || response.data.access_token || response.data.token;
    const user = resData.user || response.data.user;

    if (token) {
      localStorage.setItem('token', token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      setIsAuthenticated(true);

      try {
        await fetchPortfolio();
      } catch (e) {
        console.warn('Gagal memuat data awal portofolio:', e);
      }
    }
    return user;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.warn('Peringatan saat logout API:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setPortfolioData(initialPortfolioState);
    }
  };

  const updateProfile = async (profileData) => {
    const response = await api.put('/profile', profileData);
    const updated = response.data?.profile || response.data?.data || response.data || profileData;

    setPortfolioData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updated,
      },
    }));
    return updated;
  };

  const addAchievement = async (data) => {
    const response = await api.post('/achievements', data);
    const newItem = response.data?.data || response.data;
    setPortfolioData((prev) => ({
      ...prev,
      achievements: [newItem, ...prev.achievements],
    }));
    return newItem;
  };

  const updateAchievement = async (id, data) => {
    const response = await api.put(`/achievements/${id}`, data);
    const updatedItem = response.data?.data || response.data;
    setPortfolioData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((item) => (item.id === id ? updatedItem : item)),
    }));
    return updatedItem;
  };

  const deleteAchievement = async (id) => {
    await api.delete(`/achievements/${id}`);
    setPortfolioData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((item) => item.id !== id),
    }));
  };

  const addOrganization = async (data) => {
    const response = await api.post('/organizations', data);
    const newItem = response.data?.data || response.data;
    setPortfolioData((prev) => ({
      ...prev,
      organizations: [newItem, ...prev.organizations],
    }));
    return newItem;
  };

  const updateOrganization = async (id, data) => {
    const response = await api.put(`/organizations/${id}`, data);
    const updatedItem = response.data?.data || response.data;
    setPortfolioData((prev) => ({
      ...prev,
      organizations: prev.organizations.map((item) => (item.id === id ? updatedItem : item)),
    }));
    return updatedItem;
  };

  const deleteOrganization = async (id) => {
    await api.delete(`/organizations/${id}`);
    setPortfolioData((prev) => ({
      ...prev,
      organizations: prev.organizations.filter((item) => item.id !== id),
    }));
  };

  const addProject = async (data) => {
    const response = await api.post('/projects', data);
    const newItem = response.data?.data || response.data;
    setPortfolioData((prev) => ({
      ...prev,
      projects: [newItem, ...prev.projects],
    }));
    return newItem;
  };

  const updateProject = async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    const updatedItem = response.data?.data || response.data;
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? updatedItem : item)),
    }));
    return updatedItem;
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    setPortfolioData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  const addSkill = async (data) => {
    const response = await api.post('/skills', data);
    const newItem = response.data?.data || response.data;
    setPortfolioData((prev) => ({
      ...prev,
      skills: [...prev.skills, newItem],
    }));
    return newItem;
  };

  const deleteSkill = async (id) => {
    await api.delete(`/skills/${id}`);
    setPortfolioData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  const value = {
    portfolioData,
    loading,
    isAuthenticated,
    fetchPortfolio,
    login,
    register,
    logout,
    updateProfile,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addOrganization,
    updateOrganization,
    deleteOrganization,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    deleteSkill,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio harus digunakan di dalam PortfolioProvider');
  }
  return context;
};