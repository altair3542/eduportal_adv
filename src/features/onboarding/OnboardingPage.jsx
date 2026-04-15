import SectionHeading from '../../components/SectionHeading';
import SurfaceCard from '../../components/SurfaceCard';
import { useAppContext } from '../../context/AppContext';
import ProfileRegisterForm from './ProfileRegisterForm';
import SuccessState from './SuccessState';

function OnboardingPage() {
  const { profile, saveProfile } = useAppContext();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Perfil académico"
          title="Configura tu punto de partida"
          description="El perfil se guarda en estado global y queda disponible para el resto de pantallas."
        />

        <SurfaceCard>
          <p className="text-sm leading-6 text-slate-600">
            En esta versión el formulario deja de ser un estado aislado.
            Ahora alimenta el contexto global de la aplicación.
          </p>
        </SurfaceCard>
      </div>

      {profile ? (
        <SuccessState user={profile} onReset={() => saveProfile(null)} />
      ) : (
        <ProfileRegisterForm onSuccess={saveProfile} />
      )}
    </div>
  );
}

export default OnboardingPage;
