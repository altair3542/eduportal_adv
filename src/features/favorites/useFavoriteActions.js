import { useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';

export function useFavoriteActions(universityId) {
  const { getFavoriteById, updateFavoriteMeta, toggleFavorite } = useAppContext();
  const favorite = getFavoriteById(universityId);
  const setPriority = useCallback(
    (priority) => {
      updateFavoriteMeta(universityId, { priority });
    },
    [universityId, updateFavoriteMeta]
  );

  const setNote = useCallback(
    (note) => {
      updateFavoriteMeta(universityId, { note });
    },
    [universityId, updateFavoriteMeta]
  );

  const removeFromShortlist = useCallback(() => {
    if (favorite?.university) {
      toggleFavorite(favorite.university);
    }
  }, [favorite, toggleFavorite]);

  return {
    favorite,
    setPriority,
    setNote,
    removeFromShortlist,
  };
}
