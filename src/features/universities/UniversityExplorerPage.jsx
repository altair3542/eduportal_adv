import SectionHeading from '../../components/SectionHeading';
import { EmptyState, ErrorState, LoadingState } from './UniversityStates';
import UniversityCard from './UniversityCard';
import UniversityExplorerToolbar from './UniversityExplorerToolbar';
import { useUniversityExplorer } from './useUniversityExplorer';

function UniversityExplorerPage() {
  const {
    loading,
    error,
    query,
    country,
    domainZone,
    sort,
    saved,
    countries,
    domainZones,
    filteredUniversities,
    activeFiltersCount,
    setQuery,
    setCountry,
    setDomainZone,
    setSort,
    setSaved,
    clearFilters,
  } = useUniversityExplorer();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Sesión 5 · Exploración madura"
        title="Exploración institucional avanzada"
        description="La búsqueda, los filtros y el ordenamiento ahora viven en la URL, lo que hace la experiencia más compartible, persistente y coherente con una SPA de producto."
      />

      <UniversityExplorerToolbar
        query={query}
        setQuery={setQuery}
        country={country}
        setCountry={setCountry}
        domainZone={domainZone}
        setDomainZone={setDomainZone}
        sort={sort}
        setSort={setSort}
        saved={saved}
        setSaved={setSaved}
        countries={countries}
        domainZones={domainZones}
        activeFiltersCount={activeFiltersCount}
        clearFilters={clearFilters}
      />

      {loading ? <LoadingState /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error && filteredUniversities.length === 0 ? (
        <EmptyState />
      ) : null}

      {!loading && !error && filteredUniversities.length > 0 ? (
        <>
          <p className="text-sm text-slate-600">
            Resultados encontrados: {filteredUniversities.length}
          </p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredUniversities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default UniversityExplorerPage;
