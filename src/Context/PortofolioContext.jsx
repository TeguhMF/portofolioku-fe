import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({
    profile: {
      name: 'Muhammad Fajar',
      username: 'fajar12',
      school_name: 'SMAN 1 Jakarta',
      grade_level: 'XII IPA 1',
      nisn: '0051234567',
      bio: 'Siswa SMA yang berdedikasi di bidang teknologi dan sains. Beraspirasi menjadi Software Engineer dan aktif dalam kegiatan OSIS.',
      career_goal: 'Data Scientist & Tech Entrepreneur',
      phone_whatsapp: '081234567890',
      social_links: {
        instagram: 'fajar_tech',
        linkedin: 'muhammad-fajar',
        github: 'fajar12-code',
      },
      selected_theme: 'academic',
    },
    achievements: [
      {
        id: 1,
        title: 'Juara 1 Lomba Karya Tulis Ilmiah',
        rank: 'Juara 1',
        level: 'nasional',
        year: '2026',
        description: 'Penelitian efisiensi sistem berbasis IoT untuk pertanian skala kecil.',
      },
    ],
    organizations: [
      {
        id: 1,
        organization_name: 'OSIS SMAN 1 Jakarta',
        role: 'Ketua Sekbid IPTEK',
        start_year: '2025',
        end_year: '2026',
        description: 'Mengelola program kerja pelatihan coding dan digitalisasi absensi sekolah.',
      },
    ],
    projects: [
      {
        id: 1,
        title: 'Aplikasi Absensi Ekskul Web',
        category: 'teknologi',
        description: 'Sistem absensi berbasis QR Code menggunakan ReactJS dan Laravel.',
        project_url: 'https://github.com/fajar12-code/absensi',
      },
    ],
    skills: [
      { id: 1, skill_name: 'Public Speaking', category: 'soft_skill' },
      { id: 2, skill_name: 'Python', category: 'hard_skill' },
      { id: 3, skill_name: 'React.js', category: 'hard_skill' },
    ],
  });

  // Fungsi helper untuk merubah bagian tertentu dari state
  const updateProfile = (newProfile) => {
    setPortfolioData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...newProfile },
    }));
  };

  const addAchievement = (item) => {
    setPortfolioData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { ...item, id: Date.now() }],
    }));
  };

  const removeAchievement = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updateProfile,
        addAchievement,
        removeAchievement,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);