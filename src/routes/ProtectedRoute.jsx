import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Mengecek apakah token autentikasi tersimpan di localStorage
  const token = localStorage.getItem('auth_token');

  if (!token) {
    // Redirect ke halaman login jika belum ada token
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;