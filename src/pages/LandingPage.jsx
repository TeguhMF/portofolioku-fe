import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Briefcase, 
  FolderGit2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  GraduationCap, 
  Menu, 
  X, 
  ExternalLink 
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Portofolioku
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#fitur" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
                Fitur Unggulan
              </a>
              <a href="#template" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
                Pilihan Template
              </a>
              <a href="#cara-kerja" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
                Cara Kerja
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              >
                Masuk
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md shadow-blue-700/20 transition-all transform hover:-translate-y-0.5"
              >
                Buat Portofolio
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 hover:text-blue-700 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <a 
              href="#fitur" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-700"
            >
              Fitur Unggulan
            </a>
            <a 
              href="#template" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-700"
            >
              Pilihan Template
            </a>
            <a 
              href="#cara-kerja" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-700"
            >
              Cara Kerja
            </a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link 
                to="/login" 
                className="w-full text-center px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Masuk
              </Link>
              <Link 
                to="/register" 
                className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg shadow-md"
              >
                Buat Portofolio
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ------------------ HERO SECTION ------------------ */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Khusus Siswa SMA / SMK / MA Se-Indonesia</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Tampilkan Rekam Jejak Prestasi & Karyamu Dalam <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">Satu Link.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Catat perjalananmu selama sekolah, mulai dari prestasi, organisasi, pengalaman, hingga karya. Susun semuanya menjadi portofolio yang rapi dan siap dibagikan.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-lg shadow-blue-700/25 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Buat Portofolio Gratis</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a 
                  href="#template" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  <span>Lihat Contoh Template</span>
                </a>
              </div>

              {/* Social Proof Checklist */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Tanpa Perlu Koding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Subdomain / Link Personal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Export Resume PDF</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup Card */}
            <div className="lg:col-span-5 relative">
              {/* Decorative Blur Background */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>

              {/* Card Container */}
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 transition-all hover:shadow-blue-500/10">
                {/* Header Mockup */}
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                    MF
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Muhammad Fajar</h3>
                    <p className="text-xs text-slate-500">Siswa XII IPA 1 • SMAN 1 Jakarta</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                      Target: Computer Science / PTN
                    </span>
                  </div>
                </div>

                {/* Content Mockup Items */}
                <div className="py-5 space-y-4">
                  {/* Prestasi */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Juara 1 Lomba Karya Tulis Ilmiah</h4>
                      <p className="text-[11px] text-slate-500">Tingkat Nasional • 2026</p>
                    </div>
                  </div>

                  {/* Organisasi */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Ketua Sekbid IPTEK OSIS</h4>
                      <p className="text-[11px] text-slate-500">Masa Jabatan 2025 - 2026</p>
                    </div>
                  </div>

                  {/* Project */}
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Web Aplikasi Absensi Ekskul</h4>
                      <p className="text-[11px] text-slate-500">Project Tugas Akhir Pemrograman</p>
                    </div>
                  </div>
                </div>

                {/* Footer Link Mockup */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>URL Publik:</span>
                  <span className="font-mono text-blue-700 font-semibold flex items-center gap-1">
                    portofolioku.com/p/fajar <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------ FEATURE SHOWCASE ------------------ */}
      <section id="fitur" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Modul & Fitur Lengkap</h2>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Semua yang Dibutuhkan Siswa SMA dalam Satu Tempat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Profil & Akademik</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kelola identitas diri, NISN, sekolah, kelas, bio singkat, hingga tautan media sosial secara terstruktur.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all hover:shadow-xl hover:shadow-amber-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Prestasi & Sertifikat</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unggah sertifikat prestasi tingkat sekolah hingga internasional dengan pratinjau yang jelas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Organisasi & Ekskul</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Catat pengalaman kepemimpinan di OSIS, Pramuka, PMR, atau kepanitiaan dalam format timeline yang rapi.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all hover:shadow-xl hover:shadow-purple-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Galeri Karya & Project</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pamerkan hasil tugas sekolah, poster desain, artikel tulisan, karya seni, hingga project aplikasi.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Keterampilan & Rencana Karier</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tampilkan soft/hard skills dengan sistem chip tagging visual serta tuliskan cita-cita karir masa depanmu.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Pratinjau Langsung</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Isi formulir di sebelah kiri dan lihat perubahan portofoliomu secara langsung di sebelah kanan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ TEMPLATE SHOWCASE ------------------ */}
      <section id="template" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Desain Responsif</h2>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Pilih Gaya Template yang Sesuai Karaktermu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Template 1: Academic */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="h-44 bg-gradient-to-r from-blue-900 to-indigo-800 p-6 flex items-end">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-md">
                  🎓 Formal & Beasiswa
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Template Academic</h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  Menonjolkan nilai akademis, prestasi perlombaan, riwayat organisasi, dan sertifikat resmi secara formal.
                </p>
                <Link to="/register" className="block text-center w-full py-2.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  Gunakan Template Ini
                </Link>
              </div>
            </div>

            {/* Template 2: Creative */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="h-44 bg-gradient-to-r from-emerald-600 to-teal-800 p-6 flex items-end">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-md">
                  🎨 Visual & Galeri Karya
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Template Creative</h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  Tampilan grid visual yang modern untuk memamerkan galeri karya seni, desain, video, dan project kreatif.
                </p>
                <Link to="/register" className="block text-center w-full py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
                  Gunakan Template Ini
                </Link>
              </div>
            </div>

            {/* Template 3: Minimalist */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="h-44 bg-gradient-to-r from-slate-800 to-slate-900 p-6 flex items-end">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-md">
                  ⚡ Single Page Vertical
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Template Minimalist</h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  Layout vertikal ringkas 1 halaman yang cepat dibaca oleh penguji, HRD, maupun panitia seleksi.
                </p>
                <Link to="/register" className="block text-center w-full py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                  Gunakan Template Ini
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ HOW IT WORKS ------------------ */}
      <section id="cara-kerja" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Langkah Praktis</h2>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">
              3 Langkah Mudah Membangun Portofolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-700/20">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Buat Akun Siswa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buat akun gratis menggunakan email dan tentukan username portofolio unikmu.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-700/20">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Isi Data & Upload Karya</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lengkapi form profil, input prestasi, sertifikat, riwayat OSIS, dan project tugas sekolahmu.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/20">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Pilih Template & Bagikan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilih tampilan favoritmu, lalu bagikan link portofoliomu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ FOOTER ------------------ */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">Portofolioku</span>
            </div>
            <p className="text-xs text-slate-500 text-center md:text-right">
              Platform Portofolio Digital Khusus Siswa SMA / SMK / MA Indonesia.
            </p>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Portofolioku. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Bantuan Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;