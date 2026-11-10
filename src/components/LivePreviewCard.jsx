import { usePortfolio } from '../context/PortfolioContext';
import { Award, Briefcase, FolderGit2, Sparkles, GraduationCap, ExternalLink } from 'lucide-react';

const LivePreviewCard = () => {
  const { portfolioData } = usePortfolio();
  const { profile, achievements, organizations, projects, skills } = portfolioData;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-xs">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-700 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-base text-white border border-white/30">
            {profile.name ? profile.name.split(' ').map(n => n[0]).join('') : 'S'}
          </div>
          <div>
            <h3 className="font-bold text-sm">{profile.name || 'Nama Siswa'}</h3>
            <p className="text-blue-100 text-[11px]">
              {profile.grade_level || 'Kelas'} • {profile.school_name || 'Nama Sekolah'}
            </p>
            {profile.career_goal && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 text-[10px] border border-emerald-400/30 font-medium">
                Target: {profile.career_goal}
              </span>
            )}
          </div>
        </div>
        {profile.bio && (
          <p className="mt-3 text-[11px] text-blue-100/90 leading-relaxed italic border-t border-white/10 pt-2">
            "{profile.bio}"
          </p>
        )}
      </div>

      {/* Body Content Preview */}
      <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
        
        {/* Section Prestasi */}
        {achievements.length > 0 && (
          <div>
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-[11px] uppercase tracking-wider text-amber-600">
              <Award className="w-3.5 h-3.5" />
              Prestasi & Sertifikat
            </h4>
            <div className="space-y-2">
              {achievements.map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-800">{item.title}</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                      {item.rank}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Tingkat {item.level} • {item.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Organisasi */}
        {organizations.length > 0 && (
          <div>
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-[11px] uppercase tracking-wider text-blue-600">
              <Briefcase className="w-3.5 h-3.5" />
              Pengalaman Organisasi
            </h4>
            <div className="space-y-2">
              {organizations.map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block">{item.role}</span>
                  <p className="text-[10px] text-slate-500">
                    {item.organization_name} ({item.start_year} - {item.end_year || 'Sekarang'})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Skills */}
        {skills.length > 0 && (
          <div>
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-[11px] uppercase tracking-wider text-purple-600">
              <Sparkles className="w-3.5 h-3.5" />
              Keahlian
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((item) => (
                <span key={item.id} className="px-2 py-1 rounded-md bg-purple-50 text-purple-700 font-medium text-[10px] border border-purple-200/60">
                  {item.skill_name}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer Preview Bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500">
        <span>Theme: <b>{profile.selected_theme}</b></span>
        <span className="text-blue-600 font-mono font-semibold flex items-center gap-1">
          /p/{profile.username || 'username'} <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export default LivePreviewCard;