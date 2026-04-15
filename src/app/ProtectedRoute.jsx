import { Navigate, useLocation } from 'react-router';
import { useAppContext } from '../context/AppContext';

function ProtectedRoute({ children }) {
  const { session } = useAppContext();
  const location = useLocation();

  if (!session.isAuthenticated) {
    return <Navigate to="/perfil" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
