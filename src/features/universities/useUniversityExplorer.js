import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { getUniversities } from '../../services/universties.service'
import { useAppContext } from '../../context/AppContext'

export function useUniversityExplorer() {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const { favorites } = useAppContext()

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await getUniversities()

        if (!ignore) {
          setUniversities(Array.isArray(data) ? data : [])
        }
      } catch {
        if (!ignore) {
          setError('No fue posible cargar la exploracion insititucional')
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [])


  const query = searchParams.get('q') ?? ''
  const country = searchParams.get('country') ?? 'all'
  const domainZone = searchParams.get('domainZone') ?? 'all'
  const sort = searchParams.get('sort') ?? 'name-asc'
  const saved = searchParams.get('saved') ?? '0'

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams)

    if (!value || value === 'all' || value === 0) {
      next.delete(key)
    } else {
      next.set(key, value)
    }

    setSearchParams(next)
  }

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
    if (query.trim()) {
      const normalized = query.trim().toLowerCase();
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
  }, [universities, query, country, domainZone, sort, saved, favoriteIds]);

  const activeFiltersCount = [
    query.trim() ? 1 : 0,
    country !== 'all' ? 1 : 0,
    domainZone !== 'all' ? 1 : 0,
    saved === '1' ? 1 : 0,
  ].reduce((acc, value) => acc + value, 0);

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
    activeFiltersCount,
    setQuery: (value) => setParam('q', value),
    setCountry: (value) => setParam('country', value),
    setDomainZone: (value) => setParam('domainZone', value),
    setSort: (value) => setParam('sort', value),
    setSaved: (value) => setParam('saved', value),
    clearFilters: () => setSearchParams(new URLSearchParams()),
  };
}
