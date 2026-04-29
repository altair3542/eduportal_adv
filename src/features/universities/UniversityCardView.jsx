import { memo } from 'react'
import { Link } from 'react-router'
import SurfaceCard from '../../components/SurfaceCard'

function UniversityCardView({
  university,
  selected,
  note,
  onToggleFavorite
}) {
  return (
    <SurfaceCard className='flex h-full flex-col justify-between space-y-5'>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            {university.country}
          </span>

          <span className="inline-flex rounded-full bg-slate-100v px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            {university.domainZone}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-snug text-slate-900">
            {university.name}
          </h3>

          <p className="text-sm text-slate-500">
            Dominio institucional:{' '}
            <span className="font-medium">{university.domain}</span>
          </p>

          {note ? (
            <p className="text-sm text-slate-500">Nota rápida: {note}</p>
          ): null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={`/universidades/${university.id}`}
          className="inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Ver detalle
        </Link>

        <button
          onClick={onToggleFavorite}
          className={
            selected
              ? 'rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900'
              : 'rounded-2xl bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700'
          }
        >
          {selected ? 'Quitar de shortlist' : 'Guardar en shortlist'}
        </button>
      </div>
    </SurfaceCard>
  )
}

export default memo(UniversityCardView)
