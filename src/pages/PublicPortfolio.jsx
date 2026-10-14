import { usePortfolio } from '../context/PortfolioContext';
import { 
  Award, 
  Briefcase, 
  FolderGit2, 
  Sparkles, 
  ExternalLink, 
  GraduationCap, 
  Phone, 
  Globe, 
  FileText, 
  Share2,
  Download
} from 'lucide-react';

const PublicPortfolio = () => {
  const { portfolioData } = usePortfolio();

  const { profile = {}, achievements = [], organizations = [], projects = [], skills = [] } = portfolioData || {};
  const socialLinks = profile.social_links || {};

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Portofolio - ${profile.name || 'Siswa'}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan portofolio berhasil disalin ke clipboard!');
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between relative">
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 print:hidden">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl font-bold text-xs transition-all transform hover:scale-105 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Unduh CV (PDF)</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl font-bold text-xs transition-all transform hover:scale-105 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Bagikan</span>
        </button>
      </div>

      <div className="w-full">
        {/* Header Banner Publik yang Terhubung Langsung */}
        <header className="bg-gradient-to-r from-[#202772] via-[#262c7d] to-[#12163b] text-white py-14 px-8 sm:px-16 shadow-lg print:hidden">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8">
            
            {/* Foto Profil / Inisial */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-5xl text-white border border-white/20 shadow-2xl shrink-0 overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-extrabold tracking-wider">
                  {profile.name ? profile.name.split(' ').map((n) => n[0]).join('') : 'S'}
                </span>
              )}
            </div>

            {/* Nama & Data Sekolah */}
            <div className="text-center sm:text-left space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {profile.name || 'Nama Siswa'}
              </h1>
              
              <p className="text-sm text-blue-200/90 font-medium flex items-center justify-center sm:justify-start gap-2">
                <GraduationCap className="w-5 h-5 text-blue-300" />
                <span>{profile.school_name || 'Nama Sekolah / Instansi'}</span>
              </p>

              {profile.career_goal && (
                <p className="text-xs text-emerald-300 font-semibold pt-1">
                  Target Karir: {profile.career_goal}
                </p>
              )}

              {profile.bio && (
                <p className="text-xs text-slate-300 max-w-xl italic pt-1">
                  "{profile.bio}"
                </p>
              )}

              {/* Tautan Sosial */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3">
                {profile.phone_whatsapp && (
                  <a
                    href={`https://wa.me/${profile.phone_whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                )}

                {socialLinks.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${socialLinks.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
                  >
                    <Globe className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}

                {socialLinks.github && (
                  <a
                    href={`https://github.com/${socialLinks.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
                  >
                    <Globe className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}

                {socialLinks.instagram && (
                  <a
                    href={`https://instagram.com/${socialLinks.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
                  >
                    <Globe className="w-3.5 h-3.5" /> Instagram
                  </a>
                )}
              </div>

            </div>
          </div>
        </header>

        {/* CONTAINER CV & VIEW PORTOFOLIO */}
        <main className="max-w-4xl mx-auto px-4 sm:px-8 my-10">
          <div id="printable-cv" className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            
            {/* Header CV */}
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{profile.name || 'Nama Siswa'}</h1>
                <p className="text-sm font-bold text-blue-700 mt-1">{profile.career_goal || 'Siswa Berprestasi'}</p>
                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" /> {profile.school_name || 'Nama Sekolah'} {profile.grade_level ? `• ${profile.grade_level}` : ''}
                </p>
              </div>

              <div className="text-xs text-slate-600 space-y-1 sm:text-right">
                {profile.phone_whatsapp && <p>📱 WhatsApp: {profile.phone_whatsapp}</p>}
                {socialLinks.linkedin && <p>💼 LinkedIn: {socialLinks.linkedin}</p>}
                {socialLinks.github && <p>💻 GitHub: {socialLinks.github}</p>}
                {socialLinks.instagram && <p>📸 Instagram: {socialLinks.instagram}</p>}
              </div>
            </div>

            {/* Ringkasan Bio */}
            {profile.bio && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b-2 border-blue-600 pb-1 mb-2">Ringkasan Profil</h2>
                <p className="text-xs text-slate-700 leading-relaxed italic">"{profile.bio}"</p>
              </div>
            )}

            {/* Keahlian & Minat */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b-2 border-blue-600 pb-1 mb-3">Keahlian & Kompetensi</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((item) => (
                    <span key={item.id} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                      {item.skill_name} <span className="text-[10px] text-slate-500 font-normal">({item.category === 'hard_skill' ? 'Hard Skill' : 'Soft Skill'})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prestasi */}
            {achievements.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b-2 border-blue-600 pb-1 mb-3">Prestasi & Penghargaan</h2>
                <div className="space-y-3">
                  {achievements.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">{item.title}</h3>
                        <p className="text-[11px] text-slate-600 capitalize">Tingkat {item.level} — <span className="font-semibold text-blue-600">{item.rank}</span></p>
                      </div>
                      <span className="text-xs font-bold text-slate-500">{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organisasi */}
            {organizations.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b-2 border-blue-600 pb-1 mb-3">Pengalaman Organisasi & Ekstrakurikuler</h2>
                <div className="space-y-3">
                  {organizations.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">{item.role}</h3>
                        <p className="text-[11px] text-slate-600">{item.organization_name}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-500">{item.start_year} - {item.end_year || 'Sekarang'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-800 border-b-2 border-blue-600 pb-1 mb-3">Karya & Project Pilihan</h2>
                <div className="space-y-3">
                  {projects.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">{item.title}</h3>
                        <p className="text-[11px] text-slate-600 capitalize">Kategori: {item.category}</p>
                      </div>
                      {item.project_url && (
                        <span className="text-[11px] text-blue-600 font-mono">{item.project_url}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200 bg-white print:hidden">
        <p>Portofolio digital resmi disusun melalui <span className="font-bold text-blue-600">Portofolioku Student Portal</span></p>
      </footer>

    </div>
  );
};

export default PublicPortfolio;