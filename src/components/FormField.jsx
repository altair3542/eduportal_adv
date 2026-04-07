function FormField({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={error ? 'has-error' : ''}
      />
      <div className="field-foot">
        {error ? <p className="error-text">{error}</p> : <p className="helper-text">Campo listo.</p>}
      </div>
    </div>
  );
}

export default FormField;
