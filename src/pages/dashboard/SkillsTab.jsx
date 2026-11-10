import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';

const SkillsTab = () => {
  const context = usePortfolio() || {};
  const { portfolioData = {}, addSkill = () => {}, deleteSkill = () => {} } = context;
  const skills = Array.isArray(portfolioData?.skills) ? portfolioData.skills : [];

  const [form, setForm] = useState({
    name: '',
    category: 'Soft Skill',
    level: 'Menengah',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;

    setLoading(true);
    try {
      await addSkill(form);
      setForm({
        name: '',
        category: 'Soft Skill',
        level: 'Menengah',
      });
    } catch (error) {
      console.error('Gagal menambahkan keahlian:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
    } catch (error) {
      console.error('Gagal menghapus keahlian:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h2 className="text-base font-bold text-slate-800">Kelola Keahlian & Minat</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700">Tambah Keahlian Baru</h3>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Keahlian</label>
          <input
            type="text"
            required
            placeholder="Contoh: Public Speaking / Editing Video (CapCut) / Bahasa Inggris"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori Keahlian</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
            >
              <option value="Soft Skill">Soft Skill (Komunikasi, Kepemimpinan, dll)</option>
              <option value="Teknologi & Digital">Teknologi & Digital (Editing, Office, dll)</option>
              <option value="Bahasa Asing">Bahasa Asing</option>
              <option value="Seni & Kreatif">Seni & Kreatif (Fotografi, Seni Rupa, Musik)</option>
              <option value="Akademik & Olahraga">Akademik & Olahraga</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tingkat Kemahiran</label>
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
            >
              <option value="Pemula">Pemula (Basic)</option>
              <option value="Menengah">Menengah (Intermediate)</option>
              <option value="Mahir">Mahir (Advanced)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menambahkan...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Tambah Keahlian</span>
            </>
          )}
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Keahlian</h3>
        {skills.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada keahlian ditambahkan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skills.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                    <p className="text-[10px] text-slate-500">
                      {item.category} • <span className="font-medium text-amber-600">{item.level}</span>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsTab;