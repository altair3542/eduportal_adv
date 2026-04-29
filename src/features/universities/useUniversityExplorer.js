import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { getUniversities } from '../../services/universities.service';
import { useAppContext } from '../../context/AppContext';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export function useUniversityExplorer() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useAppContext();

  const query = searchParams.get('q') ?? '';
  const debouncedQuery = useDebouncedValue(query, 250);
  const country = searchParams.get('country') ?? 'all';
  const domainZone = searchParams.get('domain') ?? 'all';
  const sort = searchParams.get('sort') ?? 'name-asc';
  const saved = searchParams.get('saved') ?? '0';

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await getUniversities();

        if (!ignore) {
          setUniversities(data);
        }
      } catch {
        if (!ignore) {
          setError('No fue posible cargar la exploración institucional.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const setParam = useCallback(
    (key, value) => {
      const next = new URLSearchParams(searchParams);

      if (!value || value === 'all' || value === '0') {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const countries = useMemo(() => {
    return [...new Set(universities.map((item) => item.country))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [universities]);

  const domainZones = useMemo(() => {
    return [...new Set(universities.map((item) => item.domainZone))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [universities]);

  const favoriteIds = useMemo(() => favorites.map((item) => item.id), [favorites]);

  const filteredUniversities = useMemo(() => {
    let result = [...universities];

    if (debouncedQuery.trim()) {
      const normalized = debouncedQuery.trim().toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(normalized)
      );
    }

    if (country !== 'all') {
      result = result.filter((item) => item.country === country);
    }

    if (domainZone !== 'all') {
      result = result.filter((item) => item.domainZone === domainZone);
    }

    if (saved === '1') {
      result = result.filter((item) => favoriteIds.includes(item.id));
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'country-asc':
          return a.country.localeCompare(b.country);
        case 'country-desc':
          return b.country.localeCompare(a.country);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [universities, debouncedQuery, country, domainZone, sort, saved, favoriteIds]);

  return {
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
    setQuery: (value) => setParam('q', value),
    setCountry: (value) => setParam('country', value),
    setDomainZone: (value) => setParam('domain', value),
    setSort: (value) => setParam('sort', value),
    setSaved: (value) => setParam('saved', value),
    clearFilters: () => setSearchParams(new URLSearchParams()),
  };
}
