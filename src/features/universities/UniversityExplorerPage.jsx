import SectionHeading from '../../components/SectionHeading';
import UniversityCard from './UniversityCard';
import UniversityFilters from './UniversityFilters';
import { EmptyState, ErrorState, LoadingState } from './UniversityStates';
import { useUniversities } from './useUniversities';

function UniversityExplorerPage() {
  const {
    filteredUniversities,
    query,
    setQuery,
    country,
    setCountry,
    countries,
    loading,
    error,
  } = useUniversities();

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Sesión 2 · Capa de datos"
        title="Exploración académica"
        description="Integramos una fuente de instituciones, normalizamos la estructura y construimos una experiencia de búsqueda y filtrado preparada para crecer."
      />

      <UniversityFilters
        query={query}
        setQuery={setQuery}
        country={country}
        setCountry={setCountry}
        countries={countries}
      />

      {loading ? <LoadingState /> : null}
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
