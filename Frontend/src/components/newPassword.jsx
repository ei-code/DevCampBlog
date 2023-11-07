import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ResetPassword = () => {
  const { token } = useParams();
  const [inputs, setInputs] = useState({
    contraseña: '',
    confirmContraseña: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { contraseña, confirmContraseña } = inputs;

    if (contraseña !== confirmContraseña) {
      setMensaje('Las contraseñas no coinciden');
    } else {
      if (contraseña !== '' && confirmContraseña !== '') {
        const Usuario = {
          contraseña,
          confirmContraseña,
          token, // Incluye el token en el cuerpo de la solicitud
        };
        setLoading(true);
        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/new-password`, Usuario);
          const { data } = response;
          setMensaje(data.mensaje);
          setInputs({
            contraseña: '',
            confirmContraseña: '',
          });
          setTimeout(() => {
            setMensaje('');
            // Redirección después de restablecer la contraseña
            navigate('/login');
          }, 1500);
        } catch (error) {
          console.error('Error al enviar la solicitud:', error); // Agrega este log
          setMensaje('Hubo un error');
          setTimeout(() => {
            setMensaje('');
          }, 1500);
        }

        setLoading(false);
      }
    }
  };

  return (
    <div className='form-wrapper'>
      <form onSubmit={onSubmit} className="form-imputs">
        <h2>Restablecer Contraseña</h2>
        {mensaje && <div className="mensaje">{mensaje}</div>}
        <input
          onChange={HandleChange}
          type="password"
          id="contraseña"
          name="contraseña"
          value={inputs.contraseña}
          placeholder="Contraseña..."
          autoComplete="off"
          required
        />
        <input
          onChange={HandleChange}
          type="password"
          id="confirmContraseña"
          name="confirmContraseña"
          value={inputs.confirmContraseña}
          placeholder="Confirmar Contraseña..."
          autoComplete="off"
          required
        />
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Cargando..." : "Restablecer Contraseña"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
