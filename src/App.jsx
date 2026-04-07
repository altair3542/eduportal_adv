import { useState } from 'react';
import Header from './components/Header.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import SuccessMessage from './components/SuccessMessage.jsx';
import FeatureCard from './components/FeatureCard.jsx';

const featureCards = [
  {
    title: 'UI moderna y suave',
    description:
      'La interfaz usa superficies suaves, sombras sutiles y alto espacio respirable para anticipar la migración a Tailwind.',
  },
  {
    title: 'Validaciones visibles',
    description:
      'El formulario ya trabaja con errores por campo y estados de interacción, lo que facilita luego mapear estados visuales con utilidades.',
  },
  {
    title: 'Base para la sesión 6',
    description:
      'Este paquete deja lista la estructura del proyecto para incorporar autenticación, datos remotos y luego Tailwind CSS 4.1.',
  },
];

function App() {
  const [submittedUser, setSubmittedUser] = useState(null);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header />

      <main className="layout-grid">
        <section className="hero panel panel-soft">
          <div className="badge-row">
            <span className="pill pill-primary">Sesión 5 reformulada</span>
            <span className="pill">Base visual pre-Tailwind</span>
          </div>

          <h2>EduPortal Frontend</h2>
          <p className="hero-copy">
            Esta versión rehace la base del proyecto hasta la sesión 5 con una identidad
            visual moderna, cercana a lo neumórfico, pero implementada en CSS clásico para
            que el grupo pueda comparar luego por qué Tailwind acelera tanto la composición.
          </p>

          <div className="hero-metrics">
            <div className="metric panel panel-inset">
              <span className="metric-label">Módulo activo</span>
              <strong>Registro</strong>
            </div>
            <div className="metric panel panel-inset">
              <span className="metric-label">Siguiente fase</span>
              <strong>Tailwind 4.1</strong>
            </div>
            <div className="metric panel panel-inset">
              <span className="metric-label">Estilo guía</span>
              <strong>Soft UI</strong>
            </div>
          </div>
        </section>

        <aside className="stack-column">
          {featureCards.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </aside>
      </main>

      <section className="content-grid">
        <div className="panel panel-soft section-card">
          <div className="section-heading">
            <span className="eyebrow">Proyecto integrador</span>
            <h3>Registro de usuario</h3>
            <p>
              Formularios controlados, validación en tiempo real, validación final y
              renderizado condicional del éxito.
            </p>
          </div>

          {submittedUser ? (
            <SuccessMessage user={submittedUser} onReset={() => setSubmittedUser(null)} />
          ) : (
            <RegisterForm onSuccess={setSubmittedUser} />
          )}
        </div>

        <div className="panel panel-soft section-card">
          <div className="section-heading">
            <span className="eyebrow">Justificación pedagógica</span>
            <h3>¿Por qué rehacer primero en CSS?</h3>
          </div>

          <ul className="reason-list">
            <li>
              Porque el estudiante puede ver la cantidad de reglas, variables, estados y
              patrones repetidos que luego Tailwind resuelve mucho más rápido.
            </li>
            <li>
              Porque esta base deja clara la intención visual antes de migrarla a utilidades.
            </li>
            <li>
              Porque permite comparar diseño, arquitectura y ergonomía entre CSS tradicional y
              Tailwind 4.1 sin saltar pasos.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
