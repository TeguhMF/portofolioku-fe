import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Users, Plus, Trash2, Loader2 } from 'lucide-react';

const OrganizationsTab = () => {
  const { portfolioData, addOrganization, deleteOrganization } = usePortfolio();
  const organizations = Array.isArray(portfolioData?.organizations) ? portfolioData.organizations : [];

  const [form, setForm] = useState({
    organization_name: '',
    role: '',
    period: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.organization_name || !form.role) return;

    setLoading(true);
    try {
      // Mengirimkan payload terstruktur dengan fallback default
      const payload = {
        organization_name: form.organization_name,
        role: form.role,
        period: form.period || '-',
        description: form.description || '',
      };

      await addOrganization(payload);
      setForm({
        organization_name: '',
        role: '',
        period: '',
        description: '',
      });
    } catch (error) {
      console.error('Gagal menambahkan organisasi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrganization(id);
    } catch (error) {
      console.error('Gagal menghapus organisasi:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Users className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-bold text-slate-800">Kelola Pengalaman Organisasi</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700">Tambah Organisasi Baru</h3>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Organisasi / Komunitas</label>
          <input
            type="text"
            required
            placeholder="Contoh: OSIS SMAN 5 Depok / Himpunan Mahasiswa"
            value={form.organization_name}
            onChange={(e) => setForm({ ...form, organization_name: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Jabatan / Peran</label>
            <input
              type="text"
              required
              placeholder="Contoh: Ketua Umum / Anggota Divisi Humas"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Masa Jabatan / Periode</label>
            <input
              type="text"
              placeholder="Contoh: 2024 - 2025"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi Kegiatan (Opsional)</label>
          <textarea
            rows="2"
            placeholder="Tuliskan tugas utama atau pencapaian selama berorganisasi..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menambahkan...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Tambah Organisasi</span>
            </>
          )}
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Daftar Organisasi</h3>
        {organizations.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Belum ada pengalaman organisasi ditambahkan.</p>
        ) : (
          organizations.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 bg-white">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{item.organization_name || item.name}</h4>
                <p className="text-[10px] text-slate-500">
                  {item.role || item.position} • {item.period || item.duration || '-'}
                </p>
                {item.description && (
                  <p className="text-[11px] text-slate-600 mt-1">{item.description}</p>
                )}
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

export default OrganizationsTab;