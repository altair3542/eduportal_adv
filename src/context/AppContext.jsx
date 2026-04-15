import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

const INITIAL_PROFILE = null;
const INITIAL_FAVORITES = [];
const INITIAL_SESSION = { isAuthenticated: false };

export function AppProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('eduportal:profile', INITIAL_PROFILE);
  const [favorites, setFavorites] = useLocalStorage('eduportal:favorites', INITIAL_FAVORITES);
  const [session, setSession] = useLocalStorage('eduportal:session', INITIAL_SESSION);

  const saveProfile = (nextProfile) => {
    setProfile(nextProfile);
    setSession({ isAuthenticated: true });
  };

  const logout = () => {
    setSession({ isAuthenticated: false });
  };

  const toggleFavorite = (university) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === university.id);

      if (exists) {
        return current.filter((item) => item.id !== university.id);
      }

      return [...current, university];
    });
  };

  const isFavorite = (universityId) => {
    return favorites.some((item) => item.id === universityId);
  };

  const value = useMemo(
    () => ({
      profile,
      saveProfile,
      session,
      logout,
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [profile, session, favorites]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }

  return context;
}
