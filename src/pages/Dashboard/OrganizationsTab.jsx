import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

const OrganizationsTab = () => {
  const { portfolioData, addOrganization, removeOrganization } = usePortfolio();
  const { organizations } = portfolioData;

  const [form, setForm] = useState({
    organization_name: '',
    role: '',
    start_year: '2025',
    end_year: '2026',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.organization_name || !form.role) return;
    addOrganization(form);
    setForm({ organization_name: '', role: '', start_year: '2025', end_year: '2026', description: '' });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Briefcase className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Organisasi & Ekstrakurikuler</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700">Tambah Organisasi Baru</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Organisasi / Ekskul</label>
            <input
              type="text"
              required
              placeholder="Contoh: OSIS / MPK / Pramuka"
              value={form.organization_name}
              onChange={(e) => setForm({ ...form, organization_name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Jabatan / Peran</label>
            <input
              type="text"
              required
              placeholder="Contoh: Ketua Sekbid / Anggota"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tahun Mulai</label>
            <input
              type="number"
              value={form.start_year}
              onChange={(e) => setForm({ ...form, start_year: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tahun Selesai</label>
            <input
              type="text"
              placeholder="2026 atau Sekarang"
              value={form.end_year}
              onChange={(e) => setForm({ ...form, end_year: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Organisasi</span>
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Riwayat Organisasi</h3>
        {organizations.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada riwayat organisasi.</p>
        ) : (
          organizations.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{item.role}</h4>
                <p className="text-[10px] text-slate-500">
                  {item.organization_name} ({item.start_year} - {item.end_year || 'Sekarang'})
                </p>
              </div>
              <button
                onClick={() => removeOrganization(item.id)}
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

export default OrganizationsTab;