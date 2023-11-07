import React, { useState } from "react";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState(""); // Estado para mensajes de error
  const [success, setSuccess] = useState(""); // Estado para mensajes de éxito
  const [enviado, setEnviado] = useState(false);

  const handleEmailChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo) {
      setError("Por favor, ingresa tu dirección de correo electrónico.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      });

      if (response.ok) {
        setSuccess(
          "Ok!"
        );
        setCorreo("");
        setError(""); 
        setEnviado(true);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Hubo un error al procesar tu solicitud. Por favor, intentalo de nuevo más tarde.");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-imputs">
        <h2>Recuperación de Contraseña</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        {enviado ? (
            <p>
              Se ha enviado un correo electrónico con instrucciones para
              restablecer tu contraseña.
            </p>
        ) : (
          <div className="recuperacion">
            <input
              type="email"
              id="correo"
              name="email"
              value={correo}
              onChange={handleEmailChange}
              required
            />
            <button type="submit" className="btn">Enviar Solicitud</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;