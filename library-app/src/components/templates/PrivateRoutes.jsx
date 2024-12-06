import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {  
  const { user } = useSelector(state => state.auth);

  const hasRequiredRole = () => {    
    if (!allowedRoles) return true; // Jika tidak ada batasan role, semua user diizinkan
    return user?.roles?.some(role => allowedRoles.includes(role)) || false;
  };

  if (!user) {
    // Redirect ke halaman login jika user belum login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRequiredRole()) {
    // Redirect ke halaman unauthorized jika role tidak sesuai
    return <Navigate to="/unauthorized" replace />;
  }

  // Jika user login dan memiliki role yang sesuai, izinkan akses ke route
  return <Outlet />;
};

export default PrivateRoute;
