import { useState } from 'react';
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
  Share2,
  Download,
  Target,
  Image as ImageIcon,
  X
} from 'lucide-react';

const PublicPortfolio = () => {
  const { portfolioData } = usePortfolio();
  const [selectedImage, setSelectedImage] = useState(null);

  const { profile = {}, achievements = [], organizations = [], projects = [], skills = [] } = portfolioData || {};
  const socialLinks = profile.social_links || {};

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Portofolio Digital - ${profile.name || 'Siswa'}`,
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
    <div>
      {/* ==========================================
          MODAL LIGHTBOX GAMBAR (POPUP SAAT DIKLIK)
         ========================================== */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 print:hidden animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />
            {selectedImage.title && (
              <p className="mt-3 mb-1 text-xs font-bold text-slate-700 text-center px-4">
                {selectedImage.title}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          1. TAMPILAN WEB DIGITAL (Sembunyi saat Cetak)
         ========================================== */}
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-600 selection:text-white flex flex-col justify-between relative pb-16 print:hidden">
        
        {/* FLOATING ACTION BUTTONS */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 rounded-full shadow-xl font-bold text-xs transition-all transform hover:scale-105 cursor-pointer backdrop-blur-md"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Unduh CV (PDF)</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl shadow-blue-500/20 font-bold text-xs transition-all transform hover:scale-105 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan</span>
          </button>
        </div>

        <div className="w-full">
          {/* HERO HEADER BANNER */}
          <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-12 px-6 sm:px-12 shadow-md">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              
              {/* Foto Profil / Inisial (Bisa Diklik Juga) */}
              <div 
                onClick={() => profile.avatar_url && setSelectedImage({ url: profile.avatar_url, title: profile.name })}
                className={`w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-5xl text-white border-2 border-white/20 shadow-2xl shrink-0 overflow-hidden ${profile.avatar_url ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
              >
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-extrabold tracking-wider">
                    {profile.name ? profile.name.split(' ').map((n) => n[0]).join('') : 'S'}
                  </span>
                )}
              </div>

              {/* Detail Informasi Siswa */}
              <div className="text-center sm:text-left space-y-2.5 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
                  <GraduationCap className="w-4 h-4 text-blue-300" />
                  <span>{profile.school_name || 'Nama Sekolah / Instansi'}</span>
                  {profile.grade_level && <span className="text-blue-200/80">• {profile.grade_level}</span>}
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {profile.name || 'Nama Siswa'}
                </h1>

                {profile.career_goal && (
                  <p className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-center sm:justify-start gap-1.5">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>Target Karir: {profile.career_goal}</span>
                  </p>
                )}

                {profile.bio && (
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed italic">
                    "{profile.bio}"
                  </p>
                )}

                {/* Tautan Kontak */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  {profile.phone_whatsapp && (
                    <a
                      href={`https://wa.me/${profile.phone_whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  )}

                  {socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${socialLinks.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
                    >
                      <Globe className="w-3.5 h-3.5 text-pink-400" /> Instagram
                    </a>
                  )}
                </div>

              </div>
            </div>
          </header>

          {/* CONTAINER UTAMA WEB */}
          <main className="max-w-5xl mx-auto px-4 sm:px-8 my-10 space-y-10">
            
            {/* KEAHLIAN & KOMPETENSI */}
            {skills.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h2 className="text-sm font-bold text-slate-800 tracking-wider uppercase">Keahlian & Kompetensi</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((item, index) => (
                    <span 
                      key={item.id || index} 
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200/80 flex items-center gap-2"
                    >
                      <span className="font-bold text-slate-900">{item.name || item.skill_name}</span>
                      {item.category && (
                        <span className="text-[10px] text-slate-500 font-normal">
                          ({item.category})
                        </span>
                      )}
                      {item.level && (
                        <span className="text-[10px] px-2 py-0.5 bg-blue-100/70 text-blue-700 font-bold rounded-md">
                          {item.level}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* KARYA & PROJECT */}
            {projects.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FolderGit2 className="w-5 h-5 text-blue-600" />
                  <h2 className="text-sm font-bold text-slate-800 tracking-wider uppercase">Karya & Project Pilihan</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((item) => {
                    const mediaUrl = item.image_url || item.photo_url || item.file_url || item.image;
                    return (
                      <div 
                        key={item.id} 
                        className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/50 flex flex-col justify-between group shadow-sm hover:border-blue-300 transition-all"
                      >
                        {/* Area Gambar Project yang Dapat Diklik */}
                        <div 
                          onClick={() => mediaUrl && setSelectedImage({ url: mediaUrl, title: item.title })}
                          className={`w-full h-44 bg-slate-200 relative overflow-hidden flex items-center justify-center ${mediaUrl ? 'cursor-pointer group' : ''}`}
                        >
                          {mediaUrl ? (
                            <>
                              <img 
                                src={mediaUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                                <span>Klik untuk memperbesar</span>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                              <ImageIcon className="w-8 h-8" />
                              <span className="text-[10px] font-semibold">Pratinjau Proyek</span>
                            </div>
                          )}
                          {item.category && (
                            <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg z-10">
                              {item.category}
                            </span>
                          )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-1.5">
                            <h3 className="text-sm font-bold text-slate-900">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {(item.project_url || item.file_url) && (
                            <a
                              href={item.project_url || item.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors pt-2"
                            >
                              <span>Buka Proyek / Tautan</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* PRESTASI & ORGANISASI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* PRESTASI & PENGHARGAAN */}
              {achievements.length > 0 && (
                <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h2 className="text-sm font-bold text-slate-800 tracking-wider uppercase">Prestasi & Sertifikat</h2>
                  </div>

                  <div className="space-y-4">
                    {achievements.map((item) => {
                      const certUrl = item.certificate_url || item.file_url || item.photo_url || item.image_url;
                      return (
                        <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex gap-4 items-start">
                          {/* Area Gambar Sertifikat yang Dapat Diklik */}
                          <div 
                            onClick={() => certUrl && setSelectedImage({ url: certUrl, title: item.title })}
                            className={`w-16 h-16 rounded-xl bg-slate-200 shrink-0 overflow-hidden flex items-center justify-center border border-slate-300 ${certUrl ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                            title={certUrl ? "Klik untuk memperbesar sertifikat" : ""}
                          >
                            {certUrl ? (
                              <img src={certUrl} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <Award className="w-7 h-7 text-amber-500" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-xs font-bold text-slate-900 truncate">{item.title}</h3>
                              <span className="text-[11px] font-bold text-slate-500 shrink-0">{item.year}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 capitalize">
                              Tingkat {item.level} — <span className="font-semibold text-blue-600">{item.rank}</span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* PENGALAMAN ORGANISASI */}
              {organizations.length > 0 && (
                <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Briefcase className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-sm font-bold text-slate-800 tracking-wider uppercase">Pengalaman Organisasi</h2>
                  </div>

                  <div className="space-y-3">
                    {organizations.map((item) => (
                      <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold text-slate-900">{item.role}</h3>
                          <p className="text-[11px] text-slate-600">{item.organization_name}</p>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 shrink-0">
                          {item.period || `${item.start_year || ''} - ${item.end_year || 'Sekarang'}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

          </main>
        </div>

        {/* FOOTER WEB */}
        <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
          <p>Portofolio digital resmi disusun melalui <span className="font-bold text-blue-600">Portofolioku Student Portal</span></p>
        </footer>
      </div>

      {/* ==========================================
          2. TAMPILAN KHUSUS CETAK PDF / CV ATS (Hanya Muncul Saat Print)
         ========================================== */}
      <div className="hidden print:block bg-white text-slate-900 font-sans p-2 text-xs leading-relaxed max-w-3xl mx-auto">
        
        {/* FORCE COLOR PRINT STYLE */}
        <style>{`
          @media print {
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            img {
              filter: none !important;
              -webkit-filter: none !important;
            }
          }
        `}</style>

        {/* HEADER ATS */}
        <div className="border-b-2 border-slate-800 pb-4 mb-4 flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight uppercase text-slate-900">{profile.name || 'Nama Lengkap'}</h1>
            <p className="text-sm font-semibold text-slate-700">{profile.career_goal || 'Siswa SMA/SMK'}</p>
            <p className="text-xs text-slate-600">{profile.school_name} {profile.grade_level ? `• ${profile.grade_level}` : ''}</p>
            
            {/* KONTAK TEKS */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-700 pt-1">
              {profile.phone_whatsapp && <span>WhatsApp: {profile.phone_whatsapp}</span>}
              {socialLinks.instagram && <span>Instagram: @{socialLinks.instagram}</span>}
            </div>
          </div>

          {/* FOTO ATS BERWARNA */}
          {profile.avatar_url && (
            <div className="w-20 h-24 border border-slate-300 overflow-hidden rounded shrink-0">
              <img 
                src={profile.avatar_url} 
                alt={profile.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>

        {/* RINGKASAN PROFIL */}
        {profile.bio && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">Ringkasan Profil</h2>
            <p className="text-slate-700 text-[11px] justify-between">{profile.bio}</p>
          </div>
        )}

        {/* PENDIDIKAN */}
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">Pendidikan</h2>
          <div className="flex justify-between items-start text-[11px]">
            <div>
              <p className="font-bold text-slate-900">{profile.school_name || 'Nama Sekolah'}</p>
              <p className="text-slate-600">{profile.grade_level || 'Siswa'}</p>
            </div>
          </div>
        </div>

        {/* KEAHLIAN & KOMPETENSI */}
        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">Keahlian & Kompetensi</h2>
            <ul className="list-disc list-inside grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-800">
              {skills.map((item, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{item.name || item.skill_name}</span>
                  {item.level && <span className="text-slate-500"> ({item.level})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PRESTASI & PENGHARGAAN */}
        {achievements.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">Prestasi & Penghargaan</h2>
            <div className="space-y-2 text-[11px]">
              {achievements.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-slate-600">Tingkat {item.level} — <span className="font-semibold">{item.rank}</span></p>
                  </div>
                  <span className="font-bold text-slate-700">{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PENGALAMAN ORGANISASI */}
        {organizations.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">Pengalaman Organisasi & Ekstrakurikuler</h2>
            <div className="space-y-2 text-[11px]">
              {organizations.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900">{item.role}</p>
                    <p className="text-slate-600">{item.organization_name}</p>
                  </div>
                  <span className="font-bold text-slate-700">
                    {item.period || `${item.start_year || ''} - ${item.end_year || 'Sekarang'}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KARYA & PROJECT */}
        {projects.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">Karya & Proyek</h2>
            <div className="space-y-2 text-[11px]">
              {projects.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    {item.description && <p className="text-slate-600">{item.description}</p>}
                    {(item.project_url || item.file_url) && (
                      <p className="text-[10px] text-blue-800 font-mono">{item.project_url || item.file_url}</p>
                    )}
                  </div>
                  {item.category && <span className="text-slate-500 font-semibold">{item.category}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default PublicPortfolio;