import ButtonPrimary from '../../components/ButtonPrimary'
import SurfaceCard from '../../components/SurfaceCard'

function SuccessState({ user, onReset}) {
  return (
    <SurfaceCard className='space-y-5'>
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl shadow-[inset_2px_2px_8px_rgba(16,185,129,0.14),inset_-2px_-2px_8px_rgba(255,255,255,0.82)]">
        ✓
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-slate-900">
          Perfil inicial creado
        </h3>
        <p className="text-sm leading-6 text-slate-600">
          Bienvenido, <span className="font-semibold">{user.nombre}</span>. Tu
          perfil académico base quedó preparado para continuar con la búsqueda y
          exploración institucional.
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50/90 p-4 text-sm text-slate-700 shadow-[inset_3px_3px_10px_rgba(148,163,184,0.12),inset_-3px_-3px_8px_rgba(255,255,255,0.78)]">
        <p><span className="font-semibold">Correo:</span> {user.correo}</p>
        <p><span className="font-semibold">Programa:</span> {user.programa}</p>
      </div>

      <ButtonPrimary onClick={onReset}>
        Registrar otro perfil
      </ButtonPrimary>

    </SurfaceCard>
  )
}

export default SuccessState
