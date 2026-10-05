import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Plus, Trash2 } from 'lucide-react';

const AchievementsTab = () => {
  const { portfolioData, addAchievement, removeAchievement } = usePortfolio();
  const { achievements } = portfolioData;

  const [form, setForm] = useState({
    title: '',
    rank: 'Juara 1',
    level: 'nasional',
    year: '2026',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    addAchievement(form);
    setForm({ title: '', rank: 'Juara 1', level: 'nasional', year: '2026', description: '' });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Award className="w-5 h-5 text-amber-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Prestasi & Sertifikat</h2>
      </div>

      {/* Form Tambah Prestasi */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700">Tambah Prestasi Baru</h3>
        
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Kejuaraan / Lomba</label>
          <input
            type="text"
            required
            placeholder="Contoh: Lomba Karya Tulis Ilmiah Nasional"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Peringkat</label>
            <input
              type="text"
              placeholder="Juara 1 / Finalis"
              value={form.rank}
              onChange={(e) => setForm({ ...form, rank: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tingkat</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            >
              <option value="sekolah">Sekolah</option>
              <option value="kota">Kota/Kabupaten</option>
              <option value="provinsi">Provinsi</option>
              <option value="nasional">Nasional</option>
              <option value="internasional">Internasional</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tahun</label>
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Prestasi</span>
        </button>
      </form>

      {/* Daftar Prestasi Terdaftar */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Prestasi</h3>
        {achievements.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada prestasi ditambahkan.</p>
        ) : (
          achievements.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                <p className="text-[10px] text-slate-500">
                  {item.rank} • Tingkat {item.level} ({item.year})
                </p>
              </div>
              <button
                onClick={() => removeAchievement(item.id)}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AchievementsTab;