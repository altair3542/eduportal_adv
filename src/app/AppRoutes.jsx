import { Routes, Route } from 'react-router';
import AppShell from './AppShell';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import OnboardingPage from '../features/onboarding/OnboardingPage';
import UniversityExplorerPage from '../features/universities/UniversityExplorerPage';
import UniversityDetailPage from '../features/universities/UniversityDetailPage';
import FavoritesPage from '../features/favorites/FavoritesPage';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="perfil" element={<OnboardingPage />} />
        <Route path="universidades" element={<UniversityExplorerPage />} />
        <Route path="universidades/:universityId" element={<UniversityDetailPage />} />

        <Route
          path="favoritos"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
