import { useState } from 'react';
import FormField from './FormField.jsx';

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

function RegisterForm({ onSuccess }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) newErrors[field] = errorMessage;
    });

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSuccess({ ...formData });
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="field-grid">
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
          placeholder="ejemplo@correo.com"
        />

        <FormField
          label="Programa"
          name="programa"
          value={formData.programa}
          onChange={handleChange}
          error={errors.programa}
          placeholder="Ej. ADSO"
        />

        <FormField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          Registrar usuario
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={() => {
            setFormData(INITIAL_FORM);
            setErrors({});
          }}
        >
          Limpiar campos
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
