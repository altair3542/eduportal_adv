import SectionHeading from '../../components/SectionHeading';
import SurfaceCard from '../../components/SurfaceCard';
import { useAppContext } from '../../context/AppContext';
import AdvancedProfileForm from './AdvancedProfileForm';
import ProfileSummaryCard from './ProfilewSummaryCard';

function OnboardingPage() {
  const { profile, saveProfile, clearProfile } = useAppContext();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Sesión 4 · Formularios avanzados"
          title="Perfil institucional y validación semántica"
          description="El formulario deja de ser básico y comienza a validar relaciones entre selección institucional, país objetivo y correo del usuario."
        />

        <SurfaceCard>
          <p className="text-sm leading-6 text-slate-600">
            Esta sesión prepara la base para reglas más complejas en la
            exploración académica, filtros inteligentes y persistencia de
            criterios del usuario.
          </p>
        </SurfaceCard>
      </div>

      {profile ? (
        <ProfileSummaryCard profile={profile} onReset={clearProfile} />
      ) : (
        <AdvancedProfileForm onSave={saveProfile} />
      )}
    </div>
  );
}

export default OnboardingPage;
