import { usePortfolio } from '../../context/PortfolioContext';
import { Link } from 'react-router-dom';
import { 
  UserCheck, 
  Briefcase, 
  Award, 
  FolderGit2, 
  Sparkles, 
  ArrowRight, 
  Eye,
  ExternalLink
} from 'lucide-react';

const OverviewTab = () => {
  const { portfolioData } = usePortfolio();
  const { profile = {}, achievements = [], organizations = [], projects = [], skills = [] } = portfolioData;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Banner Ringkasan / Header Overview */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
              Ringkasan Portofolio
            </span>
            <h1 className="text-2xl font-extrabold mt-2">
              Halo, {profile.name || 'Siswa'}
            </h1>
            <p className="text-xs text-blue-100/90 mt-1 max-w-xl leading-relaxed">
              Berikut adalah ringkasan rekam jejak portofoliomu. Pastikan semua informasi terisi dengan lengkap dan akurat agar tampilan portofolio publikmu makin menarik!
            </p>
          </div>

          <a
            href={`/p/${profile.username || 'preview'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 self-start md:self-center"
          >
            <Eye className="w-4 h-4" />
            <span>Lihat Portofolio Publik</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Grid Utama 5 Kolom Ringkasan Modul */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. PROFIL & AKADEMIK */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Profil & Akademik</h3>
                  <p className="text-[11px] text-slate-500">Berisi identitas diri, sekolah, bio, dan target karir.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Nama Lengkap:</span>
                <span className="font-semibold text-slate-800">{profile.name || '-'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Sekolah / Instansi:</span>
                <span className="font-semibold text-slate-800">{profile.school_name || '-'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Target Karir:</span>
                <span className="font-semibold text-emerald-600">{profile.career_goal || '-'}</span>
              </div>
            </div>
          </div>

          <Link
            to="/dashboard/profile"
            className="mt-5 inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold text-xs transition-colors border border-slate-100 hover:border-blue-200"
          >
            <span>Edit Profil & Akademik</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2. ORGANISASI & EKSKUL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Organisasi & Ekskul</h3>
                  <p className="text-[11px] text-slate-500">Catatan rekam jejak kepemimpinan dan ekskul.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {organizations.length} Item
              </span>
            </div>

            <div className="space-y-2">
              {organizations.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400 italic">
                  Belum ada data organisasi.
                </div>
              ) : (
                organizations.slice(0, 3).map((org) => (
                  <div key={org.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{org.role}</p>
                      <p className="text-[10px] text-slate-500">{org.organization_name}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/dashboard/organizations"
            className="mt-5 inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-semibold text-xs transition-colors border border-slate-100 hover:border-indigo-200"
          >
            <span>Kelola Organisasi & Ekskul</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3. PRESTASI & SERTIFIKAT */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Prestasi & Sertifikat</h3>
                  <p className="text-[11px] text-slate-500">Daftar kejuaraan dan piagam sertifikat.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                {achievements.length} Prestasi
              </span>
            </div>

            <div className="space-y-2">
              {achievements.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400 italic">
                  Belum ada prestasi.
                </div>
              ) : (
                achievements.slice(0, 3).map((ach) => (
                  <div key={ach.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{ach.title}</p>
                      <p className="text-[10px] text-slate-500">Tingkat {ach.level}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/dashboard/achievements"
            className="mt-5 inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-amber-50 text-amber-600 font-semibold text-xs transition-colors border border-slate-100 hover:border-amber-200"
          >
            <span>Kelola Prestasi & Sertifikat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4. KARYA & PROJECT */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Karya & Project</h3>
                  <p className="text-[11px] text-slate-500">Galeri pameran tugas atau project siswa.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {projects.length} Karya
              </span>
            </div>

            <div className="space-y-2">
              {projects.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400 italic">
                  Belum ada karya.
                </div>
              ) : (
                projects.slice(0, 3).map((proj) => (
                  <div key={proj.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{proj.title}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/dashboard/projects"
            className="mt-5 inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-emerald-600 font-semibold text-xs transition-colors border border-slate-100 hover:border-emerald-200"
          >
            <span>Kelola Karya & Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5. KEAHLIAN & CITA-CITA */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Keahlian</h3>
                  <p className="text-[11px] text-slate-500">Hard skill, soft skill.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-600">
                <span className="font-bold text-purple-700">{profile.career_goal || 'Belum diisi'}</span>
              </p>
              {skills.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Belum ada keahlian ditambahkan.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                      {skill.skill_name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link
            to="/dashboard/skills"
            className="mt-5 inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-purple-50 text-purple-600 font-semibold text-xs transition-colors border border-slate-100 hover:border-purple-200"
          >
            <span>Kelola Keahlian & Minat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OverviewTab;