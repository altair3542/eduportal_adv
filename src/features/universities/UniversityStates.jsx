import SurfaceCard from '../../components/SurfaceCard';

export function LoadingState() {
  return (
    <SurfaceCard className="space-y-3">
      <h3 className="text-xl font-semibold text-slate-900">Cargando datos</h3>
      <p className="text-sm leading-6 text-slate-600">
        Estamos preparando la lista de instituciones académicas...
      </p>
    </SurfaceCard>
  );
}

export function ErrorState({ message }) {
  return (
    <SurfaceCard className="space-y-3 border border-rose-100">
      <h3 className="text-xl font-semibold text-rose-700">Error de carga</h3>
      <p className="text-sm leading-6 text-slate-600">{message}</p>
    </SurfaceCard>
  );
}

export function EmptyState() {
  return (
    <SurfaceCard className="space-y-3">
      <h3 className="text-xl font-semibold text-slate-900">
        Sin resultados
      </h3>
      <p className="text-sm leading-6 text-slate-600">
        No encontramos instituciones que coincidan con los filtros actuales.
      </p>
    </SurfaceCard>
  );
}
