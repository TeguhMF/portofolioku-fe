import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, AlertCircle, Loader2, X, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = usePortfolio(); // Menggunakan fungsi login dari Context
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // State Khusus Modal Lupa Kata Sandi
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetStatus, setResetStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Memanggil login() agar state isAuthenticated di PortfolioContext berubah jadi true
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal, periksa email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetSubmitting(true);
    setResetStatus({ type: '', message: '' });

    try {
      // Panggil endpoint API Laravel pemulihan kata sandi jika sudah tersedia:
      // await axios.post('/api/forgot-password', { email: resetEmail });

      // Simulasi pengiriman tautan reset
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setResetStatus({
        type: 'success',
        message: 'Tautan reset kata sandi telah dikirim ke email Anda. Silakan periksa kotak masuk/spam.'
      });
      setResetEmail('');
    } catch (err) {
      setResetStatus({
        type: 'error',
        message: err.response?.data?.message || 'Email tidak ditemukan atau terjadi kesalahan.'
      });
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white relative">
      {/* Outer Card Container */}
      <div className="w-full max-w-4xl h-auto sm:h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 flex flex-col sm:flex-row">
        
        {/* Panel Kiri (Biru Gradient) */}
        <div className="w-full sm:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Logo */}
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">Portofolioku</span>
          </div>

          {/* Text Content */}
          <div className="my-8 sm:my-auto space-y-4 relative z-10">
            <h1 className="text-3xl font-extrabold leading-tight">Selamat Datang di Portofolioku</h1>
            <div className="w-12 h-1 bg-white/60 rounded-full"></div>
            <p className="text-xs text-blue-100 leading-relaxed max-w-xs">
              Mulai bangun portofolio digitalmu sekarang. Tampilkan prestasi, kegiatan, dan karya terbaikmu.
            </p>
            <Link 
              to="/register"
              className="inline-block mt-4 px-6 py-2.5 border-2 border-white text-white font-bold text-xs rounded-full hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              DAFTAR SEKARANG
            </Link>
          </div>

          <p className="text-[10px] text-blue-200 relative z-10"></p>

          {/* Bulatan Dekoratif Putih */}
          <div className="absolute -bottom-10 -left-10 w-36 h-36 border-8 border-white/20 rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-24 h-24 bg-white rounded-full pointer-events-none hidden sm:block"></div>
        </div>

        {/* Panel Kanan (Form Login) */}
        <div className="w-full sm:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center sm:text-left mb-4">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Masuk</h2>
              <div className="w-8 h-1 bg-blue-600 rounded-full mt-1 mx-auto sm:mx-0"></div>
            </div>

            {/* Pesan Error Alert jika Login Gagal */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email / Nama Pengguna</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input 
                  type="email" 
                  required 
                  placeholder="Masukan Nama Pengguna atau Email..."
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border-b border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input 
                  type="password" 
                  required 
                  placeholder="Masukan Kata Sandi..."
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border-b border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* Tombol Pemicu Modal Lupa Kata Sandi */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPasswordOpen(true);
                  setResetStatus({ type: '', message: '' });
                }}
                className="text-[11px] text-blue-600 hover:underline cursor-pointer focus:outline-none font-medium"
              >
                Lupa kata sandi?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>MEMPROSES...</span>
                </>
              ) : (
                <span>LOGIN</span>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-500 sm:hidden pt-2">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-600 font-bold underline">
                Daftar
              </Link>
            </p>
          </form>

          {/* Bulatan Dekoratif Kanan */}
          <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-28 h-28 border-8 border-slate-100 rounded-full pointer-events-none hidden sm:block"></div>
        </div>

      </div>

      {/* ==========================================
          MODAL POP-UP LUPA KATA SANDI
         ========================================== */}
      {isForgotPasswordOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsForgotPasswordOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup Modal */}
            <button 
              onClick={() => setIsForgotPasswordOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <h3 className="text-lg font-bold text-slate-800">Pulihkan Kata Sandi</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Masukkan alamat email yang terdaftar pada akun Portofolioku kamu. Kami akan mengirimkan instruksi pemulihan.
              </p>
            </div>

            {/* Alert Status Sukses / Gagal */}
            {resetStatus.message && (
              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 mb-4 ${
                resetStatus.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-600 border border-rose-200'
              }`}>
                {resetStatus.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span>{resetStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Terdaftar</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Masukkan email Anda..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs border-b border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="flex-1 py-2.5 rounded-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                >
                  {resetSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <span>Kirim Tautan</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;