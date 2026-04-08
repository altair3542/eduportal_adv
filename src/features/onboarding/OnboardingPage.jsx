import { useState } from 'react';
import SectionHeading from '../../components/SectionHeading';
import SurfaceCard from '../../components/SurfaceCard';
import ProfileRegisterForm from './ProfileRegisterForm';
import SuccessState from './SuccessState';

function OnboardingPage() {
  const [submittedUser, setSubmittedUser] = useState(null);

  const handleReset = () => {
    setSubmittedUser(null);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Sesión 1 · Reingeniería visual"
          title="EduPortal Advanced"
          description="Reformulamos la base del frontend con Tailwind 4.1 y una identidad visual moderna para preparar la evolución del proyecto hacia datos, routing, estado global y exploración académica avanzada."
        />

        <SurfaceCard className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50/90 p-4 shadow-[inset_3px_3px_10px_rgba(148,163,184,0.12),inset_-3px_-3px_10px_rgba(255,255,255,0.75)]">
              <p className="text-sm font-semibold text-slate-900">Base técnica</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                React + Vite + Tailwind 4.1 para una capa visual más ágil y escalable.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50/90 p-4 shadow-[inset_3px_3px_10px_rgba(148,163,184,0.12),inset_-3px_-3px_10px_rgba(255,255,255,0.75)]">
              <p className="text-sm font-semibold text-slate-900">Objetivo inmediato</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Dejar preparado el shell visual del producto y el onboarding del perfil.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-sky-500 to-cyan-400 p-6 text-white shadow-[10px_10px_28px_rgba(14,116,144,0.22),-6px_-6px_18px_rgba(255,255,255,0.42)]">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
              Próxima etapa
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Integración con API académica
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/90">
              En la siguiente sesión usaremos esta base para incorporar una capa de datos con búsqueda, filtros y estados remotos.
            </p>
          </div>
        </SurfaceCard>
      </div>

      <div>
        {submittedUser ? (
          <SuccessState user={submittedUser} onReset={handleReset} />
        ) : (
          <ProfileRegisterForm onSuccess={setSubmittedUser} />
        )}
      </div>
    </div>
  );
}

export default OnboardingPage;
