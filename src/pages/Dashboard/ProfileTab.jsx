import { usePortfolio } from '../../context/PortfolioContext';
import { User, Phone, Globe, Camera } from 'lucide-react';

const ProfileTab = () => {
  const { portfolioData, updateProfile } = usePortfolio();
  const profile = portfolioData?.profile || {};
  const socialLinks = profile.social_links || {};

  // Fungsi membuat username otomatis dari nama
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Ganti spasi dengan -
      .replace(/[^\w\-]+/g, '')    // Hapus karakter non-alphanumeric
      .replace(/\-\-+/g, '-');     // Ganti multiple - dengan single -
  };

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
    } else if (name === 'name') {
      // Jika nama diubah, otomatis generate username jika username masih sesuai nama lama / kosong
      const autoUsername = slugify(value);
      updateProfile({ 
        name: value,
        username: profile.username ? profile.username : autoUsername
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
          <div className="relative w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-blue-500 shrink-0 shadow-inner">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-blue-700">
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
              placeholder="Contoh: Muhammad Fajar"
              value={profile.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Username (URL Portofolio)</label>
            <div className="flex items-center">
              <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-2 border border-r-0 border-slate-200 rounded-l-xl font-mono">/p/</span>
              <input
                type="text"
                name="username"
                value={profile.username || ''}
                onChange={handleChange}
                placeholder='muhammad-fajar'
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-r-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50 font-mono text-blue-600 font-semibold"
              />
            </div>
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
              placeholder="SMAN 1 Jakarta"
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
              placeholder="Contoh: Software Engineer"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Tentang Saya (Bio)</label>
          <textarea
            name="bio"
            rows="3"
            value={profile.bio || ''}
            onChange={handleChange}
            placeholder="Ceritakan secara singkat tentang dirimu..."
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
              placeholder="fajar-code"
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
              placeholder="fajar_art"
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