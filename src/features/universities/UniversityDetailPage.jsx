import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import ButtonPrimary from '../../components/ButtonPrimary';
import SurfaceCard from '../../components/SurfaceCard';
import { useAppContext } from '../../context/AppContext';
import { getUniversityById } from '../../services/universties.service';

function UniversityDetailPage() {
  const { universityId } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { toggleFavorite, isFavorite, getFavoriteById, updateFavoriteMeta } = useAppContext();

  useEffect(() => {
    let ignore = false;

    async function loadDetail() {
      try {
        setLoading(true);
        setError('');
        const data = await getUniversityById(universityId);

        if (!ignore) {
          if (!data) {
            setError('No encontramos la institución solicitada.');
          } else {
            setUniversity(data);
          }
        }
      } catch {
        if (!ignore) {
          setError('No fue posible cargar el detalle institucional.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      ignore = true;
    };
  }, [universityId]);

  if (loading) {
    return (
      <SurfaceCard>
        <p className="text-sm text-slate-600">Cargando detalle institucional...</p>
      </SurfaceCard>
    );
  }

  if (error || !university) {
    return (
      <SurfaceCard className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Detalle no disponible</h2>
        <p className="text-sm text-slate-600">{error}</p>
        <Link
          to="/universidades"
          className="inline-flex rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Volver a exploración
        </Link>
      </SurfaceCard>
    );
  }

  const favorite = getFavoriteById(university.id);
  const selected = isFavorite(university.id);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr]">
      <SurfaceCard className="space-y-5">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              {university.country}
            </span>
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              {university.domainZone}
            </span>
          </div>

          <h2 className="text-3xl font-semibold text-slate-900">
            {university.name}
          </h2>
        </div>

        <div className="grid gap-3 rounded-2xl bg-slate-50/90 p-4 text-sm text-slate-700 shadow-[inset_3px_3px_10px_rgba(148,163,184,0.12),inset_-3px_-3px_8px_rgba(255,255,255,0.78)]">
          <p><span className="font-semibold">País:</span> {university.country}</p>
          <p><span className="font-semibold">Dominio:</span> {university.domain}</p>
          <p><span className="font-semibold">Zona:</span> {university.domainZone}</p>
          <p>
            <span className="font-semibold">Sitio:</span>{' '}
            {university.website ? (
              <a
                href={university.website}
                target="_blank"
                rel="noreferrer"
                className="text-sky-700 underline"
              >
                {university.website}
              </a>
            ) : (
              'No disponible'
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonPrimary onClick={() => toggleFavorite(university)}>
            {selected ? 'Quitar de shortlist' : 'Guardar en shortlist'}
          </ButtonPrimary>

          <Link
            to="/universidades"
            className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Volver
          </Link>
        </div>
      </SurfaceCard>

      <SurfaceCard className="space-y-5">
        <h3 className="text-2xl font-semibold text-slate-900">
          Gestión de shortlist
        </h3>

        {selected && favorite ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Prioridad
              </label>
              <select
                value={favorite.priority}
                onChange={(event) =>
                  updateFavoriteMeta(university.id, { priority: event.target.value })
                }
                className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
              >
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Nota personal
              </label>
              <textarea
                value={favorite.note}
                onChange={(event) =>
                  updateFavoriteMeta(university.id, { note: event.target.value })
                }
                rows={5}
                className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
                placeholder="Escribe aquí tus observaciones sobre esta institución..."
              />
            </div>
          </div>
        ) : (
          <p className="text-sm leading-6 text-slate-600">
            Guarda esta institución en la shortlist para poder asignar prioridad
            y registrar una nota personalizada.
          </p>
        )}
      </SurfaceCard>
    </div>
  );
}

export default UniversityDetailPage;
