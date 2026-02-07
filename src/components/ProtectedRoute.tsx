import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppData } from '../data/appData';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAppData();
  const location = useLocation();

  if (isLoading) {
    return <div className="text-sm text-muted">Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
