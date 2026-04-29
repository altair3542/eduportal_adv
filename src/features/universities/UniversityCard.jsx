import { useCallback } from 'react'
import { useAppContext } from '../../context/AppContext'
import UniversityCardView from './UniversityCardView'

function UniversityCard({ university }) {
  const { toggleFavorite, isFavorite, getFavoriteById  } = useAppContext()
  const selected = isFavorite(university.id)
  const favorite = getFavoriteById(university.id)

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(university)
  }, [toggleFavorite, university])

  return (
    <UniversityCardView
      university={university}
      selected={selected}
      note={favorite?.note ?? ''}
      onToggleFavorite={handleToggleFavorite}
    />
  )
}

export default UniversityCard
