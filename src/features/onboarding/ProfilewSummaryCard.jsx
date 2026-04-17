import ButtonPrimary from '../../components/ButtonPrimary';
import SurfaceCard from '../../components/SurfaceCard';

function ProfileSummaryCard({ profile, onReset }) {
  return (
    <SurfaceCard className="space-y-5">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-slate-900">
          Perfil persistido correctamente
        </h3>
        <p className="text-sm leading-6 text-slate-600">
          El perfil ya quedó sincronizado con la lógica institucional del proyecto.
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50/90 p-4 text-sm text-slate-700 shadow-[inset_3px_3px_10px_rgba(148,163,184,0.12),inset_-3px_-3px_8px_rgba(255,255,255,0.78)]">
        <p><span className="font-semibold">Nombre:</span> {profile.nombre}</p>
        <p><span className="font-semibold">Correo:</span> {profile.correo}</p>
        <p><span className="font-semibold">Programa:</span> {profile.programa}</p>
        <p><span className="font-semibold">País objetivo:</span> {profile.paisObjetivo}</p>
        <p><span className="font-semibold">Tipo de correo:</span> {profile.tipoCorreo}</p>
        <p>
          <span className="font-semibold">Institución:</span>{' '}
          {profile.universidadObjetivo?.name ?? 'No disponible'}
        </p>
      </div>

      <ButtonPrimary onClick={onReset}>Editar perfil</ButtonPrimary>
    </SurfaceCard>
  );
}

export default ProfileSummaryCard;
