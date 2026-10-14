import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, Phone, Globe, Camera, Save, CheckCircle2 } from 'lucide-react';

const ProfileTab = () => {
  const { portfolioData, updateProfile } = usePortfolio();
  const profile = portfolioData?.profile || {};
  const socialLinks = profile.social_links || {};

  const [isSaved, setIsSaved] = useState(false);

  // Fungsi membuat username otomatis dari nama
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsSaved(false);

    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      updateProfile({
        social_links: {
          ...socialLinks,
          [socialKey]: value,
        },
      });
    } else if (name === 'name') {
      const autoUsername = slugify(value);
      updateProfile({ 
        name: value,
        username: profile.username ? profile.username : autoUsername
      });
    } else {
      updateProfile({ [name]: value });
    }
  };

  // Mengubah gambar menjadi Data URL (Base64) agar aman disimpan di LocalStorage
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simpan ke localStorage agar data tersimpan
    localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-800">Profil & Data Diri</h2>
        </div>

        {/* Indicator Toast tersimpan */}
        {isSaved && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> Berhasil Disimpan!
          </span>
        )}
      </div>

      <form className="space-y-4" onSubmit={handleSave}>
        {/* Upload Foto Profil */}
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

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              placeholder="Contoh: Andika Septa"
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
                placeholder='andika'
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
              placeholder="Bos muda"
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
            placeholder="Tuliskan deskripsi diri Anda..."
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
              placeholder="08563617237"
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
              placeholder="Andkaspta ngrha"
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
              placeholder="dikz22"
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
              placeholder="andkasptangrha"
              value={socialLinks.instagram || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Tombol Simpan Profil (Gambar 1) */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;