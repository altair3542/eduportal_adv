import SectionHeading from '../components/SectionHeading';
import SurfaceCard from '../components/SurfaceCard';
import { useAppContext } from '../context/AppContext';

function DashboardPage() {
  const { profile, favorites } = useAppContext();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Sesión 3 · Arquitectura SPA"
        title="Panel general"
        description="Ahora la aplicación cuenta con navegación, layout persistente y estado global compartido."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <SurfaceCard>
          <p className="text-sm font-semibold text-slate-500">Perfil</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {profile ? 'Configurado' : 'Pendiente'}
          </p>
        </SurfaceCard>

        <SurfaceCard>
          <p className="text-sm font-semibold text-slate-500">Favoritos</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {favorites.length}
          </p>
        </SurfaceCard>

        <SurfaceCard>
          <p className="text-sm font-semibold text-slate-500">Estado</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            SPA activa
          </p>
        </SurfaceCard>
      </div>
    </div>
  );
}

export default DashboardPage;
