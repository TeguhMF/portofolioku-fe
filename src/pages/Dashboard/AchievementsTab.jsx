import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Plus, Trash2, FileCheck, Loader2 } from 'lucide-react';

const AchievementsTab = () => {
  const { portfolioData, addAchievement, deleteAchievement } = usePortfolio();
  const achievements = Array.isArray(portfolioData?.achievements) ? portfolioData.achievements : [];

  const [form, setForm] = useState({
    title: '',
    rank: 'Juara 1',
    level: 'nasional',
    year: '2026',
    description: '',
    certificate_url: '',
  });

  const [loading, setLoading] = useState(false);

  const handleCertificateUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, certificate_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    setLoading(true);
    try {
      // Menyiapkan payload data lengkap untuk disajikan ke API Laravel
      const payload = {
        title: form.title,
        issuer: `${form.rank || 'Juara'} (Tingkat ${form.level || 'Nasional'})`,
        year: String(form.year || '2026'),
        description: form.description || `${form.rank} Tingkat ${form.level}`,
        rank: form.rank,
        level: form.level,
        certificate_url: form.certificate_url,
      };

      await addAchievement(payload);
      setForm({
        title: '',
        rank: 'Juara 1',
        level: 'nasional',
        year: '2026',
        description: '',
        certificate_url: '',
      });
    } catch (error) {
      console.error('Gagal menambahkan prestasi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAchievement(id);
    } catch (error) {
      console.error('Gagal menghapus prestasi:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Award className="w-5 h-5 text-amber-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Prestasi & Sertifikat</h2>
      </div>

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

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Foto Sertifikat (Optional)</label>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>{form.certificate_url ? 'Ganti Sertifikat' : 'Upload Berkas'}</span>
              <input type="file" accept="image/*" onChange={handleCertificateUpload} className="hidden" />
            </label>
            {form.certificate_url && (
              <span className="text-[11px] text-emerald-600 font-bold">✓ Berkas Siap</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menambahkan...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Tambah Prestasi</span>
            </>
          )}
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Prestasi</h3>
        {achievements.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada prestasi ditambahkan.</p>
        ) : (
          achievements.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                {item.certificate_url && (
                  <img src={item.certificate_url} alt="Sertifikat" className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                  <p className="text-[10px] text-slate-500">
                    {item.rank || item.issuer} • Tingkat {item.level || 'Nasional'} ({item.year})
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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