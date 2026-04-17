export function getEmailDomain(email) {
  const sanitized = email.trim().toLowerCase()

  if (!sanitized.includes('@')) return ''

  return sanitized.split('@')[1] ?? ''
}

export function validateBasicField(name, value) {
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

    case 'paisObjetivo':
      if (!value.trim()) return 'Debe seleccionar un país.';
      return '';

    case 'universidadObjetivoId':
      if (!value.trim()) return 'Debe seleccionar una institución.';
      return '';

    default:
      return '';
  }
}

export function validateInstitutionalDomain(formData, selectedUniversity) {
  if (formData.tipoCorreo !== 'institucional') return '';

  if (!selectedUniversity) {
    return 'Debe elegir una institución para validar el correo institucional.';
  }

  const emailDomain = getEmailDomain(formData.correo);
  const institutionalDomain = selectedUniversity.domain?.toLowerCase() ?? '';

  if (!emailDomain || !institutionalDomain) {
    return 'No fue posible validar el dominio institucional.';
  }

  if (emailDomain !== institutionalDomain) {
    return `El dominio del correo debe coincidir con ${institutionalDomain}.`;
  }

  return '';
}
