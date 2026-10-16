import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Folder, Plus, Trash2, Image, ExternalLink, Loader2 } from 'lucide-react';

const ProjectsTab = () => {
  const context = usePortfolio() || {};
  const { portfolioData = {}, addProject = () => {}, deleteProject = () => {} } = context;
  const projects = Array.isArray(portfolioData?.projects) ? portfolioData.projects : [];

  const [form, setForm] = useState({
    title: '',
    category: 'Karya Tulis / Makalah',
    description: '',
    tools: '',
    file_url: '',
    image_url: '',
  });

  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    setLoading(true);
    try {
      await addProject(form);
      setForm({
        title: '',
        category: 'Karya Tulis / Makalah',
        description: '',
        tools: '',
        file_url: '',
        image_url: '',
      });
    } catch (error) {
      console.error('Gagal menambahkan karya:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Gagal menghapus karya:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Folder className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Karya & Tugas Sekolah</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700">Tambah Karya / Tugas Baru</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Judul Karya / Tugas</label>
            <input
              type="text"
              required
              placeholder="Contoh: Poster Edukasi Lingkungan / Makalah Sejarah"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori Karya</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white"
            >
              <option value="Karya Tulis / Makalah">Karya Tulis / Makalah</option>
              <option value="Seni & Desain Grafis">Seni & Desain Grafis (Poster/Infografis)</option>
              <option value="Video / Audio Kreatif">Video / Audio Kreatif</option>
              <option value="Prakarya & Kewirausahaan">Prakarya & Kewirausahaan</option>
              <option value="Praktikum & Penelitian">Praktikum & Penelitian</option>
              <option value="Presentasi / Modul">Presentasi / Modul</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Alat / Media yang Digunakan</label>
            <input
              type="text"
              placeholder="Contoh: Canva, CapCut, MS Word, PowerPoint"
              value={form.tools}
              onChange={(e) => setForm({ ...form, tools: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Link Berkas (Google Drive / YouTube / DLL)</label>
            <input
              type="url"
              placeholder="https://drive.google.com/file/..."
              value={form.file_url}
              onChange={(e) => setForm({ ...form, file_url: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi Singkat Karya</label>
          <textarea
            rows="2"
            placeholder="Jelaskan secara singkat tentang karya atau tugas yang kamu buat..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Foto / Preview Karya</label>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
              <Image className="w-4 h-4 text-indigo-600" />
              <span>{form.image_url ? 'Ganti Foto' : 'Upload Foto Karya'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {form.image_url && (
              <span className="text-[11px] text-emerald-600 font-bold">✓ Foto Siap</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menambahkan...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Tambah Karya</span>
            </>
          )}
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Karya & Tugas</h3>
        {projects.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada karya ditambahkan.</p>
        ) : (
          projects.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-12 h-12 object-cover rounded-lg border border-slate-200" />
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                  <p className="text-[10px] text-indigo-600 font-semibold">{item.category}</p>
                  {item.tools && (
                    <p className="text-[10px] text-slate-500 mt-0.5">Media: {item.tools}</p>
                  )}
                  {item.file_url && (
                    <div className="flex gap-2 mt-1">
                      <a href={item.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-slate-600 hover:text-indigo-600">
                        <ExternalLink className="w-3 h-3" /> Lihat Karya
                      </a>
                    </div>
                  )}
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

export default ProjectsTab;