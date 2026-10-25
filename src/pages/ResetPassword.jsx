import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { GraduationCap, Lock, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Ambil token & email dari query string URL (?token=xxx&email=xxx)
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (password.length < 8) {
      setError('Kata sandi minimal harus 8 karakter.');
      return;
    }

    setLoading(true);

    try {
      // Kirim request ke Laravel API
      await axios.post('/api/reset-password', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui kata sandi. Token mungkin sudah kadaluarsa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/80 relative overflow-hidden">
        
        {/* Header Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900">Portofolioku</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Buat Kata Sandi Baru</h2>
          <p className="text-xs text-slate-500 mt-1">
            Silakan masukkan kata sandi baru untuk akun <span className="font-semibold text-slate-700">{email}</span>
          </p>
        </div>

        {/* Notifikasi Sukses */}
        {success ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">Kata Sandi Berhasil Diubah!</h3>
            <p className="text-xs text-emerald-700">
              Mengalihkan kamu ke halaman login dalam beberapa detik...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Alert Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Kata Sandi Baru</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Minimal 8 karakter..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border-b border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Konfirmasi Kata Sandi Baru</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Ulangi kata sandi baru..."
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border-b border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SIMPAN KATA SANDI...</span>
                </>
              ) : (
                <span>SIMPAN KATA SANDI BARU</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Halaman Login</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;