import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, Globe, Camera, Save, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const buildFormDataFromProfile = (profile) => {
  const safeProfile = profile && typeof profile === 'object' ? profile : {};

  let social = { instagram: '' };
  if (safeProfile.social_links) {
    if (typeof safeProfile.social_links === 'string') {
      try {
        social = { ...social, ...JSON.parse(safeProfile.social_links) };
      } catch {
        // Abaikan parsing jika gagal
      }
    } else if (typeof safeProfile.social_links === 'object') {
      social = { ...social, ...safeProfile.social_links };
    }
  }

  return {
    name: safeProfile.name || '',
    username: safeProfile.username || '',
    school_name: safeProfile.school_name || '',
    grade_level: safeProfile.grade_level || '',
    career_goal: safeProfile.career_goal || '',
    bio: safeProfile.bio || '',
    phone_whatsapp: safeProfile.phone_whatsapp || safeProfile.phone || '',
    avatar_url: safeProfile.avatar_url || '',
    social_links: {
      instagram: social.instagram || safeProfile.social_instagram || '',
    },
  };
};

const ProfileTab = () => {
  const { portfolioData, updateProfile, loading: contextLoading } = usePortfolio();

  const [formData, setFormData] = useState(() => buildFormDataFromProfile(portfolioData?.profile));
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (portfolioData?.profile) {
      setFormData(buildFormDataFromProfile(portfolioData.profile));
    }
  }, [portfolioData?.profile]);

  const slugify = (text) => {
    return String(text || '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsSaved(false);
    setErrorMessage('');

    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData((prev) => ({
        ...prev,
        social_links: {
          ...(prev?.social_links || {}),
          [socialKey]: value,
        },
      }));
    } else if (name === 'name') {
      const autoUsername = slugify(value);
      setFormData((prev) => ({
        ...prev,
        name: value,
        username: prev.username ? prev.username : autoUsername,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('Ukuran foto maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar_url: reader.result }));
      setIsSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setIsSaved(false);

    try {
      await updateProfile(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error('Gagal menyimpan profil:', err);
      setErrorMessage('Gagal menyimpan data profil ke database.');
    } finally {
      setLoading(false);
    }
  };

  if (contextLoading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-2" />
        <span className="text-xs font-semibold text-slate-500">Memuat data profil...</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-800">Profil & Data Diri</h2>
        </div>

        {isSaved && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Berhasil Disimpan!
          </span>
        )}

        {errorMessage && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
            <AlertCircle className="w-4 h-4" /> {errorMessage}
          </span>
        )}
      </div>

      <form className="space-y-4" onSubmit={handleSave}>
        {/* Upload Foto Profil */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="relative w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-blue-500 shrink-0 shadow-inner">
            {formData.avatar_url ? (
              <img src={formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-blue-600" />
            )}
          </div>
          <div>
            <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer shadow-sm transition-colors">
              <Camera className="w-4 h-4 text-slate-500" />
              <span>Unggah Foto Baru</span>
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
            <p className="text-[10px] text-slate-400 mt-1.5">Format JPG/PNG, Maksimal 2MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              placeholder="Contoh: Teguh Wijaya"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Username URL Portofolio</label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-500 font-mono">
                /p/
              </span>
              <input
                type="text"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                placeholder="teguh-wijaya"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-r-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-slate-50 font-mono text-blue-600 font-semibold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Sekolah / Instansi</label>
            <input
              type="text"
              name="school_name"
              value={formData.school_name || ''}
              onChange={handleChange}
              placeholder="SMAN 5 Depok / MAN 5 Bogor"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kelas / Tingkat</label>
            <input
              type="text"
              name="grade_level"
              value={formData.grade_level || ''}
              onChange={handleChange}
              placeholder="Contoh: Kelas XII IPA 1"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Target Cita-cita / Karir</label>
            <input
              type="text"
              name="career_goal"
              value={formData.career_goal || ''}
              onChange={handleChange}
              placeholder="Contoh: Software Engineer"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor WhatsApp / HP</label>
            <input
              type="text"
              name="phone_whatsapp"
              placeholder="081234567890"
              value={formData.phone_whatsapp || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Bio / Deskripsi Diri Singkat</label>
          <textarea
            name="bio"
            rows="3"
            value={formData.bio || ''}
            onChange={handleChange}
            placeholder="Tuliskan deskripsi diri Anda..."
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          ></textarea>
        </div>

        {/* Media Sosial */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-blue-600" /> Tautan Media Sosial
          </h3>
          <div className="max-w-md">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Instagram Username</label>
              <input
                type="text"
                name="social_instagram"
                placeholder="username_instagram"
                value={formData.social_links?.instagram || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Profil</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;