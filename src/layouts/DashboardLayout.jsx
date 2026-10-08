import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  UserCheck, 
  Award, 
  Briefcase, 
  FolderGit2, 
  Sparkles,  
  ExternalLink, 
  LogOut, 
  Menu, 
  X,
  Eye
} from 'lucide-react';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock Data User (Nanti didapat dari API Laravel)
  const user = {
    name: 'Muhammad Fajar',
    username: 'fajar12',
    school: 'SMAN 1 Jakarta',
    avatar: null
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const navigation = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Profil & Akademik', path: '/dashboard/profile', icon: UserCheck },
    { name: 'Organisasi & Ekskul', path: '/dashboard/organizations', icon: Briefcase },
    { name: 'Prestasi & Sertifikat', path: '/dashboard/achievements', icon: Award },
    { name: 'Karya & Project', path: '/dashboard/projects', icon: FolderGit2 },
    { name: 'Keahlian & Cita-cita', path: '/dashboard/skills', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800">
      
      {/* ------------------ SIDEBAR (DESKTOP) ------------------ */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-30">
        {/* Brand Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
            Portofolioku
          </span>
        </div>

        {/* User Info Card */}
        <div className="p-4 mx-3 my-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-800 truncate">{user.name}</h4>
            <p className="text-[10px] text-slate-500 truncate">{user.school}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          {/* Quick Link to Public Portfolio */}
          <a
            href={`/p/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Lihat Portofolio</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* ------------------ MOBILE SIDEBAR OVERLAY ------------------ */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <span className="font-bold text-lg text-blue-900">Portofolioku</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ------------------ MAIN CONTENT AREA ------------------ */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-600 lg:hidden hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-sm font-bold text-slate-800">
              Dashboard Portofolio Siswa
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`/p/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
            >
              <span>Lihat Portofolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;