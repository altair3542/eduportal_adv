import { useMemo, useState } from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import FormField from '../../components/FormField';
import SurfaceCard from '../../components/SurfaceCard';
import { useUniversities } from '../universities/useUniversities';
import {
  validateBasicField,
  validateInstitutionalDomain,
} from './validation';

const INITIAL_PROFILE_FORM = {
  nombre: '',
  correo: '',
  programa: '',
  paisObjetivo: '',
  universidadObjetivoId: '',
  tipoCorreo: 'personal',
};

function AdvancedProfileForm({ onSave }) {
  const [formData, setFormData] = useState(INITIAL_PROFILE_FORM);
  const [errors, setErrors] = useState({});

  const { universities, countries } = useUniversities();

  const availableUniversities = useMemo(() => {
    if (!formData.paisObjetivo) return [];
    return universities.filter(
      (item) => item.country === formData.paisObjetivo
    );
  }, [universities, formData.paisObjetivo]);

  const selectedUniversity = useMemo(() => {
    return (
      availableUniversities.find(
        (item) => item.id === formData.universidadObjetivoId
      ) ?? null
    );
  }, [availableUniversities, formData.universidadObjetivoId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === 'paisObjetivo') {
        next.universidadObjetivoId = '';
      }

      return next;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: validateBasicField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    Object.keys(INITIAL_PROFILE_FORM).forEach((field) => {
      if (field === 'tipoCorreo') return;
      const message = validateBasicField(field, formData[field]);
      if (message) nextErrors[field] = message;
    });

    const domainError = validateInstitutionalDomain(
      formData,
      selectedUniversity
    );

    if (domainError) {
      nextErrors.correo = domainError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSave({
      ...formData,
      universidadObjetivo: selectedUniversity,
    });
  };

  return (
    <SurfaceCard className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-slate-900">
          Perfil avanzado de exploración
        </h3>
        <p className="text-sm leading-6 text-slate-600">
          Este formulario conecta el perfil con la capa de datos y añade una
          validación semántica basada en dominio institucional.
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
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          error={errors.correo}
          placeholder="usuario@dominio.com"
        />

        <FormField
          label="Programa de interés"
          name="programa"
          value={formData.programa}
          onChange={handleChange}
          error={errors.programa}
          placeholder="Ej. Ciencia de Datos"
        />

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">
            Tipo de correo
          </label>
          <select
            name="tipoCorreo"
            value={formData.tipoCorreo}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="personal">Personal</option>
            <option value="institucional">Institucional</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">
            País objetivo
          </label>
          <select
            name="paisObjetivo"
            value={formData.paisObjetivo}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="">Seleccione un país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.paisObjetivo ? (
            <p className="text-sm font-medium text-rose-600">{errors.paisObjetivo}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">
            Institución objetivo
          </label>
          <select
            name="universidadObjetivoId"
            value={formData.universidadObjetivoId}
            onChange={handleChange}
            disabled={!formData.paisObjetivo}
            className="w-full rounded-2xl border border-white/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-800 shadow-[inset_4px_4px_12px_rgba(148,163,184,0.18),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] outline-none focus:ring-4 focus:ring-sky-100 disabled:opacity-50"
          >
            <option value="">Seleccione una institución</option>
            {availableUniversities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.universidadObjetivoId ? (
            <p className="text-sm font-medium text-rose-600">{errors.universidadObjetivoId}</p>
          ) : null}
        </div>

        {formData.tipoCorreo === 'institucional' && selectedUniversity ? (
          <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-800">
            El correo institucional debe terminar en:
            <span className="ml-1 font-semibold">{selectedUniversity.domain}</span>
          </div>
        ) : null}

        <div className="flex justify-end pt-2">
          <ButtonPrimary type="submit">Guardar perfil avanzado</ButtonPrimary>
        </div>
      </form>
    </SurfaceCard>
  );
}

export default AdvancedProfileForm;
