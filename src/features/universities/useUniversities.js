import { useEffect, useMemo, useState } from 'react'
import { getUniversities } from '../../services/universities.service'

export function useUniversities() {
  const [universities, setUniversities] = useState([]);
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUniversities() {
      try {
        setLoading(true);
        setError('');

        const data = await getUniversities();

        if (!ignore) {
          setUniversities(data);
        }
      } catch {
        if (!ignore) {
          setError('No fue posible cargar las instituciones.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUniversities();

    return () => {
      ignore = true;
    };
  }, []);

  const countries = useMemo(() => {
    const unique = [...new Set(universities.map((item) => item.country))];
    return unique.sort((a, b) => a.localeCompare(b));
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((item) => {
      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      const matchesCountry =
        country === 'all' ? true : item.country === country;

      return matchesQuery && matchesCountry;
    });
  }, [universities, query, country]);

  return {
    universities,
    filteredUniversities,
    query,
    setQuery,
    country,
    setCountry,
    countries,
    loading,
    error,
  };
}
