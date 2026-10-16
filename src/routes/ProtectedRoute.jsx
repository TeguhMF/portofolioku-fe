import { Navigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = usePortfolio();
  const token = localStorage.getItem('token');

  // Tampilkan loading saat sesi sedang diperiksa
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="text-xs font-semibold text-slate-500 animate-pulse">
          Memuat
        </span>
      </div>
    );
  }

  // Jika token tidak ada atau tidak terautentikasi, lempar ke login
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;