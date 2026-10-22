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
  ChevronDown,
  HelpCircle
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Masukkan URL link atau lokasi file gambar hero di sini
  const [heroImageUrl, setHeroImageUrl] = useState(
    'src/assets/kids.png'
  );

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Apakah pembuat portofolio ini benar-benar gratis?',
      a: 'Ya, 100% gratis untuk seluruh siswa SMA/SMK/MA se-Indonesia tanpa biaya tersembunyi.'
    },
    {
      q: 'Bagaimana cara kerja fitur Unduh CV ATS?',
      a: 'Data yang kamu masukkan di dashboard akan dikonversi otomatis menjadi format CV ATS standar industri saat dicetak/diunduh. Tampilan web tetap interaktif, sedangkan hasil cetaknya bersih dan rapi khusus lamaran/beasiswa.'
    },
    {
      q: 'Apakah saya bisa mengunggah bukti foto sertifikat dan proyek?',
      a: 'Tentu saja! Kamu bisa menambahkan foto karya, gambar sertifikat, dan tautan langsung agar portofoliomu lebih valid dan terpercaya.'
    },
    {
      q: 'Apakah link portofolio publik saya bisa diakses siapa saja?',
      a: 'Ya, kamu akan mendapatkan link unik (misal: portofolioku.com/p/username) yang bisa langsung kamu bagikan ke recruiter, universitas, atau dipajang di bio media sosial.'
    }
  ];

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
              <a href="#cara-kerja" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
                Cara Kerja
              </a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">
                FAQ
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
              href="#cara-kerja" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-700"
            >
              Cara Kerja
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-700"
            >
              FAQ
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
                Tampilkan Rekam Jejak Prestasi & Karyamu Dalam <span className="text-blue-700">Satu Link.</span>
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
                  <span>Export CV ATS Resmi (PDF)</span>
                </div>
              </div>
            </div>

            {/* Right Side - Gambar Custom Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-white p-2 transform hover:scale-[1.01] transition-all">
                <img 
                  src={heroImageUrl} 
                  alt="Pratinjau Portofolio Siswa" 
                  className="w-full h-auto rounded-xl object-cover"
                />
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
              Semua yang Dibutuhkan dalam Satu Tempat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Profil & Akademik</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kelola identitas diri, NISN, sekolah, kelas, bio singkat, hingga tautan media sosial secara terstruktur.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all hover:shadow-xl hover:shadow-amber-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Prestasi & Sertifikat</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unggah sertifikat prestasi tingkat sekolah hingga internasional dengan pratinjau foto visual yang terverifikasi.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Organisasi & Ekskul</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Catat pengalaman kepemimpinan di OSIS, Pramuka, PMR, atau kepanitiaan dalam format timeline yang rapi.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all hover:shadow-xl hover:shadow-purple-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Galeri Karya & Project</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pamerkan hasil tugas sekolah, poster desain, artikel tulisan, karya seni, hingga project aplikasi.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Keterampilan & Rencana Karier</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tampilkan soft/hard skills dengan sistem chip tagging visual serta tuliskan cita-cita karir masa depanmu.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-500/5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Cetak CV ATS Otomatis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ubah seluruh data portofoliomu menjadi lembar CV ATS standar lamaran kerja & beasiswa dalam sekali klik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ HOW IT WORKS ------------------ */}
      <section id="cara-kerja" className="py-20 bg-slate-50 border-b border-slate-200">
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
              <h3 className="text-lg font-bold text-slate-800 mb-2">Bagikan & Unduh CV</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bagikan link portofoliomu ke recruiter/kampus dan unduh CV ATS berfotomu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ FAQ SECTION ------------------ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>Pertanyaan Populer</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Sering Ditanyakan</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-bold text-sm text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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