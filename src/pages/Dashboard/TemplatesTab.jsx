import { usePortfolio } from '../../context/PortfolioContext';
import { Palette, CheckCircle2 } from 'lucide-react';

const TemplatesTab = () => {
  const { portfolioData, setTheme } = usePortfolio();
  const currentTheme = portfolioData.profile.selected_theme;

  const themes = [
    {
      id: 'academic',
      name: 'Academic Professional',
      desc: 'Tampilan bersih, formal, dan terstruktur. Cocok untuk pendaftaran beasiswa dan PTN.',
      color: 'bg-blue-600',
    },
    {
      id: 'creative',
      name: 'Creative Student',
      desc: 'Desain modern, dinamis dengan aksen warna pop. Cocok untuk jurusan seni, komunikasi, dan IT.',
      color: 'bg-purple-600',
    },
    {
      id: 'minimalist',
      name: 'Clean Minimalist',
      desc: 'Desain simpel tanpa gangguan visual. Fokus pada konten riwayat prestasi dan karya.',
      color: 'bg-slate-800',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 font-sans">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Palette className="w-5 h-5 text-emerald-600" />
        <h2 className="text-base font-bold text-slate-800">Pilih Template Portofolio Publik</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {themes.map((t) => {
          const isSelected = currentTheme === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`w-3 h-3 rounded-full ${t.color}`}></span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                </div>
                <h3 className="font-bold text-xs text-slate-800">{t.name}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{t.desc}</p>
              </div>

              <button
                type="button"
                className={`w-full mt-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSelected ? 'Digunakan' : 'Pilih Template'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplatesTab;