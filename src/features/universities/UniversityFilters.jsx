import SurfaceCard from '../../components/SurfaceCard';

function UniversityFilters({
  query,
  setQuery,
  country,
  setCountry,
  countries,
}) {
  return (
    <SurfaceCard className="space-y-5">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">
          Filtros de exploración
        </h3>
        <p className="text-sm leading-6 text-slate-600">
          Busca instituciones por nombre y limita resultados por país.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="search"
            className="text-sm font-medium text-slate-700"
          >
            Buscar universidad
          </label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. Universidad Nacional"
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="text-sm font-medium text-slate-700"
          >
            Filtrar por país
          </label>
          <select
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">Todos los países</option>
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </SurfaceCard>
  );
}

export default UniversityFilters;
