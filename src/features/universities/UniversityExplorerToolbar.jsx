import SurfaceCard from '../../components/SurfaceCard';

function UniversityExplorerToolbar({
  query,
  setQuery,
  country,
  setCountry,
  domainZone,
  setDomainZone,
  sort,
  setSort,
  saved,
  setSaved,
  countries,
  domainZones,
  activeFiltersCount,
  clearFilters,
}) {
  return (
    <SurfaceCard className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Filtros de exploración
          </h3>
          <p className="text-sm text-slate-600">
            Activos actualmente: {activeFiltersCount}
          </p>
        </div>

        <button
          onClick={clearFilters}
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-2 xl:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Buscar por nombre
          </label>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. Universidad Nacional"
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">País</label>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">Todos</option>
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Zona de dominio
          </label>
          <select
            value={domainZone}
            onChange={(event) => setDomainZone(event.target.value)}
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="all">Todas</option>
            {domainZones.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Ordenar por
          </label>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="country-asc">País A-Z</option>
            <option value="country-desc">País Z-A</option>
          </select>
        </div>
      </div>

      <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={saved === '1'}
          onChange={(event) => setSaved(event.target.checked ? '1' : '0')}
          className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200"
        />
        Mostrar solo instituciones guardadas
      </label>
    </SurfaceCard>
  );
}

export default UniversityExplorerToolbar;
