import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [inputs, setInputs] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { correo, contraseña } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (correo !== "" && contraseña !== "") {
      const Usuario = {
        correo,
        contraseña,
      };
      setLoading(true);

      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, Usuario); 
        const { data } = res;
        setMensaje(data.mensaje);

        setTimeout(() => {
          setMensaje("");
          localStorage.setItem("token", data?.usuario.token);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("name", data?.usuario.nombre);
          localStorage.setItem("name", data?.usuario.correo);

          navigate("/")
          onLogin();
          setTimeout(() => {
          }, 1500);
        });
      } catch (error) {
        setMensaje("Correo o contraseña incorrecta");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={onSubmit} className="form-imputs">
          <h2>Bienvenido a la página</h2>
          <h3>De Inicio de Sesión!</h3>
          <input
            onChange={(e) => handleChange(e)}
            value={correo}
            name="correo"
            id="correo"
            type="email"
            placeholder="Correo..."
            autoComplete="off"
          />
          <input
            onChange={(e) => handleChange(e)}
            value={contraseña}
            name="contraseña"
            id="contraseña"
            type="password"
            placeholder="Contraseña..."
            autoComplete="off"
          />
          <button type="submit" className="btn">
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
          <p>
            ¿Aún no tienes una cuenta?{" "}
            <b onClick={() => navigate("/Register")}>Regístrate</b>
          </p>
          <p>
            <b onClick={() => navigate("/forgotPassword")}>
              ¿Olvidaste tu contraseña?{" "}
            </b>
          </p>
          {mensaje && <div>{mensaje}</div>}
        </form>        
    </div>
  );
};
export default Login;