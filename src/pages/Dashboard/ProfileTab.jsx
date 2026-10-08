import { usePortfolio } from '../../context/PortfolioContext';
import { User, Phone, Globe, Camera } from 'lucide-react';

const ProfileTab = () => {
  const { portfolioData, updateProfile } = usePortfolio();
  const profile = portfolioData?.profile || {};
  const socialLinks = profile.social_links || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      updateProfile({
        social_links: {
          ...socialLinks,
          [socialKey]: value,
        },
      });
    } else {
      updateProfile({ [name]: value });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      updateProfile({ avatar_url: imagePreviewUrl });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <User className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-bold text-slate-800">Profil & Data Diri</h2>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="relative w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-blue-500 shrink-0">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-blue-600">
                {profile.name ? profile.name.split(' ').map((n) => n[0]).join('') : 'S'}
              </span>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Foto Profil</label>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-sm">
              <Camera className="w-3.5 h-3.5" /> Pilih Foto
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
            <p className="text-[10px] text-slate-400 mt-1">Format: JPG, PNG, WEBP (Max 2MB)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Username (URL Portofolio)</label>
            <input
              type="text"
              name="username"
              value={profile.username || ''}
              onChange={handleChange}
              placeholder='portofolioku.com/p/fajar-12'
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Sekolah / Instansi</label>
            <input
              type="text"
              name="school_name"
              value={profile.school_name || ''}
              onChange={handleChange}
              placeholder="MAN 5 BOGOR"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Target Karir / Cita-cita</label>
            <input
              type="text"
              name="career_goal"
              value={profile.career_goal || ''}
              onChange={handleChange}
              placeholder="Contoh: Dokter, Guru, Atlet, atau Programmer"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Tentang Saya</label>
          <textarea
            name="bio"
            rows="3"
            value={profile.bio || ''}
            onChange={handleChange}
            placeholder="Ceritakan secara singkat tentang dirimu, minat, atau hal yang ingin kamu capai."
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          ></textarea>
        </div>

        <hr className="border-slate-100 my-4" />

        <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-blue-600" /> Kontak & Media Sosial
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
            </label>
            <input
              type="text"
              name="phone_whatsapp"
              placeholder="081234567890"
              value={profile.phone_whatsapp || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">LinkedIn (Username/URL)</label>
            <input
              type="text"
              name="social_linkedin"
              placeholder="muhammad-fajar"
              value={socialLinks.linkedin || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">GitHub (Username)</label>
            <input
              type="text"
              name="social_github"
              placeholder="fajar12-code"
              value={socialLinks.github || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Instagram (Username)</label>
            <input
              type="text"
              name="social_instagram"
              placeholder="fajar_tech"
              value={socialLinks.instagram || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;