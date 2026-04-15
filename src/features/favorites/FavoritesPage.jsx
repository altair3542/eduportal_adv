import SectionHeading from '../../components/SectionHeading';
import SurfaceCard from '../../components/SurfaceCard';
import { useAppContext } from '../../context/AppContext';
import UniversityCard from '../universities/UniversityCard';

function FavoritesPage() {
  const { favorites } = useAppContext();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Shortlist académica"
        title="Universidades favoritas"
        description="Estas instituciones se mantienen en estado global y persisten localmente."
      />

      {favorites.length === 0 ? (
        <SurfaceCard>
          <h3 className="text-xl font-semibold text-slate-900">
            Aún no hay favoritos
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Explora universidades y guarda las que quieras revisar después.
          </p>
        </SurfaceCard>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
