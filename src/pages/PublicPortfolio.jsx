import { usePortfolio } from '../context/PortfolioContext';
import { Award, Briefcase, FolderGit2, Sparkles, ExternalLink, GraduationCap } from 'lucide-react';

const PublicPortfolio = () => {
  const { portfolioData } = usePortfolio();
  const { profile, achievements, organizations, projects, skills } = portfolioData;

  const theme = profile.selected_theme || 'academic';

  // Styles dynamic berdasarkan theme
  const themeStyles = {
    academic: {
      bg: 'bg-slate-50',
      header: 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white',
      card: 'bg-white border-slate-200 shadow-sm',
      accent: 'text-blue-600',
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    creative: {
      bg: 'bg-purple-50/50',
      header: 'bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 text-white',
      card: 'bg-white border-purple-100 shadow-md',
      accent: 'text-purple-600',
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    minimalist: {
      bg: 'bg-zinc-50',
      header: 'bg-zinc-900 text-white',
      card: 'bg-white border-zinc-200 shadow-none',
      accent: 'text-zinc-900',
      badge: 'bg-zinc-100 text-zinc-800 border-zinc-300',
    },
  }[theme];

  return (
    <div className={`min-h-screen ${themeStyles.bg} font-sans selection:bg-blue-500 selection:text-white pb-16`}>
      {/* Top Banner Header */}
      <header className={`${themeStyles.header} py-16 px-4 sm:px-8 border-b`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-3xl sm:text-4xl text-white border-2 border-white/30 shadow-xl shrink-0">
            {profile.name ? profile.name.split(' ').map((n) => n[0]).join('') : 'S'}
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{profile.name}</h1>
              {profile.grade_level && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                  {profile.grade_level}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-white/90 font-medium flex items-center justify-center sm:justify-start gap-1.5">
              <GraduationCap className="w-4 h-4" />
              {profile.school_name}
            </p>

            {profile.career_goal && (
              <p className="text-xs text-emerald-300 font-semibold tracking-wide">
                Target Karir: {profile.career_goal}
              </p>
            )}

            {profile.bio && (
              <p className="text-xs text-white/80 max-w-xl leading-relaxed pt-2">
                "{profile.bio}"
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Main Portfolio Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 mt-8 space-y-8">
        
        {/* Section Keahlian */}
        {skills.length > 0 && (
          <section className={`p-6 rounded-2xl border ${themeStyles.card}`}>
            <h2 className={`text-sm font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${themeStyles.accent}`}>
              <Sparkles className="w-4 h-4" />
              Keahlian & Minat
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((item) => (
                <span key={item.id} className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${themeStyles.badge}`}>
                  {item.skill_name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Section Prestasi */}
        {achievements.length > 0 && (
          <section className={`p-6 rounded-2xl border ${themeStyles.card}`}>
            <h2 className={`text-sm font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${themeStyles.accent}`}>
              <Award className="w-4 h-4" />
              Prestasi & Kejuaraan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-xs text-slate-800">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0">
                      {item.rank}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 capitalize">
                    Tingkat {item.level} • {item.year}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section Organisasi */}
        {organizations.length > 0 && (
          <section className={`p-6 rounded-2xl border ${themeStyles.card}`}>
            <h2 className={`text-sm font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${themeStyles.accent}`}>
              <Briefcase className="w-4 h-4" />
              Pengalaman Organisasi
            </h2>
            <div className="space-y-3">
              {organizations.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-xs text-slate-800">{item.role}</h3>
                    <p className="text-[11px] text-slate-500">
                      {item.organization_name}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {item.start_year} - {item.end_year || 'Sekarang'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section Karya & Project */}
        {projects.length > 0 && (
          <section className={`p-6 rounded-2xl border ${themeStyles.card}`}>
            <h2 className={`text-sm font-bold flex items-center gap-2 mb-4 uppercase tracking-wider ${themeStyles.accent}`}>
              <FolderGit2 className="w-4 h-4" />
              Karya & Project
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
                      {item.project_url && (
                        <a href={item.project_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]">
                          <span>Lihat</span> <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <h3 className="font-bold text-xs text-slate-800">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer Branding */}
      <footer className="mt-16 text-center text-xs text-slate-400">
        <p>Portofolio dibuat secara resmi melalui <span className="font-bold text-blue-600">Portofolioku Student Portal</span></p>
      </footer>
    </div>
  );
};

export default PublicPortfolio;