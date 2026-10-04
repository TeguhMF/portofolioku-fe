import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('auth_token', 'dummy_token_12345');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white">
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
            <h1 className="text-3xl font-extrabold leading-tight">Welcome to Portofolioku</h1>
            <div className="w-12 h-1 bg-white/60 rounded-full"></div>
            <p className="text-xs text-blue-100 leading-relaxed max-w-xs">
              Mulai bangun portofolio digital SMA-mu sekarang. Tampilkan prestasi, OSIS, dan karya terbaikmu secara profesional.
            </p>
            <Link 
              to="/register"
              className="inline-block mt-4 px-6 py-2.5 border-2 border-white text-white font-bold text-xs rounded-full hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              DAFTAR SEKARANG
            </Link>
          </div>

          <p className="text-[10px] text-blue-200 relative z-10">© Portofolioku Student Portal</p>

          {/* Bulatan Dekoratif Putih */}
          <div className="absolute -bottom-10 -left-10 w-36 h-36 border-8 border-white/20 rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-24 h-24 bg-white rounded-full pointer-events-none hidden sm:block"></div>
        </div>

        {/* Panel Kanan (Form Login) */}
        <div className="w-full sm:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center sm:text-left mb-4">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Sign In</h2>
              <div className="w-8 h-1 bg-blue-600 rounded-full mt-1 mx-auto sm:mx-0"></div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email / Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input 
                  type="email" 
                  required 
                  placeholder="Enter Username or Email..."
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border-b border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input 
                  type="password" 
                  required 
                  placeholder="Enter Password..."
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border-b border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-[11px] text-blue-600 hover:underline">Lupa kata sandi?</a>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 cursor-pointer"
            >
              LOGIN
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
    </div>
  );
};

export default Login;