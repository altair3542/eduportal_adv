import SectionHeading from '../../components/SectionHeading';
import UniversityCard from './UniversityCard';
import UniversityExplorerToolbar from './UniversityExplorerToolbar';
import UniversitySkeletonGrid from './UniversitySkeletonGrid';
import { EmptyState, ErrorState } from './UniversityStates';
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
        eyebrow="Sesión 6 · Calidad y rendimiento"
        title="Exploración institucional optimizada"
        description="Reducimos fricción, extraemos responsabilidades y mejoramos la experiencia percibida sin cambiar el objetivo funcional del módulo."
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
        clearFilters={clearFilters}
      />

      {loading ? <UniversitySkeletonGrid /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error && filteredUniversities.length === 0 ? (
        <EmptyState />
      ) : null}

      {!loading && !error && filteredUniversities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredUniversities.map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default UniversityExplorerPage;
