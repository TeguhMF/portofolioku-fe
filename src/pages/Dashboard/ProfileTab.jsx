import { usePortfolio } from '../../context/PortfolioContext';
import { UserCheck, Save } from 'lucide-react';

const ProfileTab = () => {
  const { portfolioData, updateProfile } = usePortfolio();
  const { profile } = portfolioData;

  const handleChange = (e) => {
    updateProfile({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <UserCheck className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Profil & Akademik</h2>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Username Publik</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Sekolah</label>
            <input
              type="text"
              name="school_name"
              value={profile.school_name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Kelas</label>
            <input
              type="text"
              name="grade_level"
              value={profile.grade_level}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">NISN</label>
            <input
              type="text"
              name="nisn"
              value={profile.nisn}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Cita-cita / Career Goal</label>
          <input
            type="text"
            name="career_goal"
            value={profile.career_goal}
            onChange={handleChange}
            placeholder="Contoh: Data Scientist / Dokter"
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Bio Singkat</label>
          <textarea
            name="bio"
            rows="3"
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          ></textarea>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;