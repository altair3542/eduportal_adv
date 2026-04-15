import { Outlet } from 'react-router';
import NavItem from '../components/NavItem';
import { useAppContext } from '../context/AppContext';

function AppShell() {
  const { profile, favorites, session, logout } = useAppContext();

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-[32px] border border-white/60 bg-white/65 p-5 shadow-[12px_12px_28px_rgba(148,163,184,0.18),-10px_-10px_24px_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
                EduPortal Advanced
              </p>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Routing, layouts y estado global
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                {profile ? `Perfil activo: ${profile.nombre}` : 'Sin perfil activo'}
              </p>
            </div>

            <nav className="flex flex-wrap gap-2 rounded-3xl bg-slate-50/80 p-2 shadow-[inset_3px_3px_8px_rgba(148,163,184,0.12),inset_-2px_-2px_8px_rgba(255,255,255,0.72)]">
              <NavItem to="/">Inicio</NavItem>
              <NavItem to="/universidades">Universidades</NavItem>
              <NavItem to="/favoritos">Favoritos ({favorites.length})</NavItem>
              <NavItem to="/perfil">Perfil</NavItem>
            </nav>
          </div>

          {session.isAuthenticated ? (
            <button
              onClick={logout}
              className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Cerrar sesión simulada
            </button>
          ) : null}
        </header>

        <Outlet />
      </div>
    </div>
  );
}

export default AppShell;
