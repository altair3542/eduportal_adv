import SurfaceCard from '../../components/SurfaceCard';

function UniversityCard({ university }) {
  return (
    <SurfaceCard className="flex h-full flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          {university.country}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-snug text-slate-900">
            {university.name}
          </h3>
          <p className="text-sm text-slate-600">
            Dominio institucional: <span className="font-medium">{university.domain}</span>
          </p>
        </div>
      </div>

      <div className="pt-2">
        {university.website ? (
          <a
            href={university.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Visitar sitio
          </a>
        ) : (
          <p className="text-sm text-slate-400">Sin sitio web disponible</p>
        )}
      </div>
    </SurfaceCard>
  );
}

export default UniversityCard;
