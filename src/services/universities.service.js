import universitiesSeed from '../data/universities.seed.json';

function slugify(Value) {
  return Value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getDomainZone(domain) {
  if (!domain) return 'unknown'

  const parts = domain.split('.')
  if (parts.length >=2) {
    return `.${parts.slice(-2).join('.')}`
  }

  return `.${domain}`
}

function normalizeUniversity(university) {
  const domain = university.domain ?? university.domains?.[0] ?? 'Dominio no disponible'
  const website = university.website ?? university.web_pages?.[0] ?? ''

  return {
    id: university.id ?? `${slugify(university.country)}-${slugify(university.name)}`,
    name: university.name ?? 'Institución sin nombre',
    country: university.country ?? 'País no especificado',
    domain,
    domainZone: getDomainZone(domain),
    website,
  }
}

export async function getUniversities() {
  await new Promise((resolve)=> setTimeout(resolve, 700))

  const list = Array.isArray(universitiesSeed) ? universitiesSeed : []
  return list.map(normalizeUniversity)
}

export async function getUniversityById(universityId) {
  const universities = await getUniversities()
  return universities.find((item) => item.id === universityId) ?? null
}
