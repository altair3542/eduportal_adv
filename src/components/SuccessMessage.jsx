function SuccessMessage({ user, onReset }) {
  return (
    <section className="success-box panel panel-inset">
      <span className="pill pill-success">Registro completado</span>
      <h3>Bienvenido, {user.nombre}</h3>
      <p>
        Tu perfil inicial fue creado correctamente. Esta confirmación se renderiza desde el
        estado, no desde manipulación manual del DOM.
      </p>

      <div className="success-details">
        <div>
          <span>Correo</span>
          <strong>{user.correo}</strong>
        </div>
        <div>
          <span>Programa</span>
          <strong>{user.programa}</strong>
        </div>
      </div>

      <button type="button" className="primary-button" onClick={onReset}>
        Registrar otro usuario
      </button>
    </section>
  );
}

export default SuccessMessage;
