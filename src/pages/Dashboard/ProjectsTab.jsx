import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

const ProjectsTab = () => {
  const { portfolioData, addProject, removeProject } = usePortfolio();
  const { projects } = portfolioData;

  const [form, setForm] = useState({
    title: '',
    category: 'teknologi',
    description: '',
    project_url: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    addProject(form);
    setForm({ title: '', category: 'teknologi', description: '', project_url: '' });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <FolderGit2 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Karya & Project</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700">Tambah Karya / Project Baru</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Judul Karya</label>
            <input
              type="text"
              required
              placeholder="Contoh: Website Absensi Sekolah"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            >
              <option value="teknologi">Teknologi</option>
              <option value="seni_desain">Seni & Desain</option>
              <option value="tulisan">Tulisan / Karya Ilmiah</option>
              <option value="video">Video / Multi-media</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Link Demo / Karya (Optional)</label>
          <input
            type="url"
            placeholder="https://github.com/username/project"
            value={form.project_url}
            onChange={(e) => setForm({ ...form, project_url: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karya</span>
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Karya & Project</h3>
        {projects.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada karya ditambahkan.</p>
        ) : (
          projects.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                <p className="text-[10px] text-slate-500 capitalize">
                  Kategori: {item.category}
                </p>
              </div>
              <button
                onClick={() => removeProject(item.id)}
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

export default ProjectsTab;