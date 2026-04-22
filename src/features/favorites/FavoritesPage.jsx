import SectionHeading from '../../components/SectionHeading';
import SurfaceCard from '../../components/SurfaceCard';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router';

function FavoritesPage() {
  const { favorites, updateFavoriteMeta, toggleFavorite } = useAppContext();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Shortlist avanzada"
        title="Instituciones guardadas"
        description="La shortlist ahora conserva prioridad y notas, de modo que el usuario no solo guarde instituciones, sino que organice una decisión."
      />

      {favorites.length === 0 ? (
        <SurfaceCard>
          <h3 className="text-xl font-semibold text-slate-900">
            Aún no hay instituciones guardadas
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Explora instituciones y añádelas a la shortlist para priorizarlas.
          </p>
        </SurfaceCard>
      ) : (
        <div className="grid gap-6">
          {favorites.map((item) => (
            <SurfaceCard key={item.id} className="space-y-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {item.university.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {item.university.country} · {item.university.domain}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/universidades/${item.id}`}
                    className="inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Ver detalle
                  </Link>

                  <button
                    onClick={() => toggleFavorite(item.university)}
                    className="rounded-2xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700"
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Prioridad
                  </label>
                  <select
                    value={item.priority}
                    onChange={(event) =>
                      updateFavoriteMeta(item.id, { priority: event.target.value })
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
                    Nota de evaluación
                  </label>
                  <textarea
                    rows={4}
                    value={item.note}
                    onChange={(event) =>
                      updateFavoriteMeta(item.id, { note: event.target.value })
                    }
                    className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
                    placeholder="Escribe observaciones, ventajas, dudas o próximos pasos..."
                  />
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
