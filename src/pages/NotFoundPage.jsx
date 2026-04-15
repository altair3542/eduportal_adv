import { Link } from 'react-router';
import SurfaceCard from '../components/SurfaceCard';

function NotFoundPage() {
  return (
    <SurfaceCard className="space-y-4">
      <h2 className="text-3xl font-semibold text-slate-900">
        Ruta no encontrada
      </h2>

      <p className="text-sm text-slate-600">
        La pantalla solicitada no existe dentro de EduPortal Advanced.
      </p>

      <Link
        className="inline-flex rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
        to="/"
      >
        Volver al inicio
      </Link>
    </SurfaceCard>
  );
}

export default NotFoundPage;
