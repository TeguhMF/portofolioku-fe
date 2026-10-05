import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, Plus, Trash2 } from 'lucide-react';

const SkillsTab = () => {
  const { portfolioData, addSkill, removeSkill } = usePortfolio();
  const { skills } = portfolioData;

  const [form, setForm] = useState({
    skill_name: '',
    category: 'hard_skill',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.skill_name) return;
    addSkill(form);
    setForm({ skill_name: '', category: 'hard_skill' });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Keahlian & Minat</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700">Tambah Keahlian Baru</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Skill / Minat</label>
            <input
              type="text"
              required
              placeholder="Contoh: Python, Public Speaking, Graphic Design"
              value={form.skill_name}
              onChange={(e) => setForm({ ...form, skill_name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white"
            >
              <option value="hard_skill">Hard Skill</option>
              <option value="soft_skill">Soft Skill</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Skill</span>
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Keahlian</h3>
        {skills.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada keahlian ditambahkan.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50 text-purple-900 text-xs font-semibold"
              >
                <span>{item.skill_name}</span>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-200 text-purple-800">
                  {item.category === 'hard_skill' ? 'Hard' : 'Soft'}
                </span>
                <button
                  onClick={() => removeSkill(item.id)}
                  className="p-0.5 text-purple-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
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