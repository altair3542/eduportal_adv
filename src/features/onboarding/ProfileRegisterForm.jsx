import { useMemo, useState } from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import FormField from '../../components/FormField';
import SurfaceCard from '../../components/SurfaceCard';

const INITIAL_FORM = {
  nombre: '',
  correo: '',
  programa: '',
  password: '',
};

function validateField(name, value) {
  switch (name) {
    case 'nombre':
      if (!value.trim()) return 'El nombre es obligatorio.';
      if (value.trim().length < 3) return 'Debe tener al menos 3 caracteres.';
      return '';

    case 'correo':
      if (!value.trim()) return 'El correo es obligatorio.';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Correo no válido.';
      return '';

    case 'programa':
      if (!value.trim()) return 'El programa es obligatorio.';
      return '';

    case 'password':
      if (!value) return 'La contraseña es obligatoria.';
      if (value.length < 6) return 'Debe tener al menos 6 caracteres.';
      return '';

    default:
      return '';
  }
}

function ProfileRegisterForm({ onSuccess }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const isFormValid = useMemo(() => {
    return Object.values(formData).every((value) => value.trim() !== '') &&
      Object.values(errors).every((error) => error === '');
  }, [formData, errors]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    Object.keys(formData).forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) nextErrors[field] = message;
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSuccess({ ...formData });
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  return (
    <SurfaceCard className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          Configuración inicial del perfil
        </h3>
        <p className="text-sm leading-6 text-slate-600">
          Esta base nos servirá para conectar luego la búsqueda institucional,
          filtros persistentes y validaciones más avanzadas.
        </p>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <FormField
          label="Nombre completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          placeholder="Ej. Laura Martínez"
        />

        <FormField
          label="Correo electrónico"
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          error={errors.correo}
          placeholder="laura@correo.com"
        />

        <FormField
          label="Programa académico"
          name="programa"
          value={formData.programa}
          onChange={handleChange}
          error={errors.programa}
          placeholder="Ej. Ingeniería de Software"
        />

        <FormField
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Mínimo 6 caracteres"
        />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            Esta sesión instala la base visual y funcional del nuevo bloque
            avanzado del proyecto.
          </p>

          <ButtonPrimary type="submit" disabled={!isFormValid}>
            Guardar perfil inicial
          </ButtonPrimary>
        </div>
      </form>
    </SurfaceCard>
  );
}

export default ProfileRegisterForm;
