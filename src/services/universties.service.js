import universitiesSeed from '../data/universities.seed.json';

function slugify(Value) {
  return Value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeUniversity(university) {
  return{
    id: `${slugify(university.country)}-${slugify(university.name)}`,
    name: university.name ?? 'Institución sin nombre',
    country: university.country ?? 'País no especificado',
    domain: university.domains?.[0] ?? 'Dominio no disponible',
    website: university.web_pages?.[0] ?? '',
  }
}

export async function getUniversities() {
  await new Promise((resolve)=> setTimeout(resolve, 700))

  return universitiesSeed.map(normalizeUniversity)
}
