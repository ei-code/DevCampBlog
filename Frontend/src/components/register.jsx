import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    correo: "",
    nombre: "",
    apellido: "",
    contraseña: "",
    confirmContraseña: "",
  });

  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { nombre, apellido, contraseña, correo, confirmContraseña } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (contraseña !== confirmContraseña) {
      setMensaje("las contraseñas no coinciden");
    } 

    if (
      nombre !== "" &&
      apellido !== "" &&
      contraseña !== "" &&
      confirmContraseña !== "" &&
      correo !== ""
    ) {
      const Usuario = {
        nombre,
        apellido,
        correo,
        contraseña,
        confirmContraseña,
      };
      setLoading(true);
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/register`, Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({
            nombre: "",
            apellido: "",
            contraseña: "",
            correo: "",
            confirmContraseña: "",
          });
          setTimeout(() => {
            setMensaje("");
            navigate("/Login");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });

      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={(e) => onSubmit(e)} className="form-imputs">
          <h2>Bienvenido a la pagina</h2>
          <h3>De Registro!</h3>
          <input
            onChange={(e) => HandleChange(e)}
            value={nombre}
            name="nombre"
            id="nombre"
            type="text"
            placeholder="Nombre..."
            autoComplete="off"
          />
          <input
            onChange={(e) => HandleChange(e)}
            value={apellido}
            name="apellido"
            id="apellido"
            type="text"
            placeholder="Apellido..."
            autoComplete="off"
          />
          <input
            onChange={(e) => HandleChange(e)}
            value={correo}
            name="correo"
            id="correo"
            type="email"
            placeholder="Correo..."
            autoComplete="off"
          />
          <input
            onChange={(e) => HandleChange(e)}
            value={contraseña}
            name="contraseña"
            id="contraseña"
            type="password"
            placeholder="Contraseña..."
            autoComplete="off"
          />

          <input
            onChange={(e) => HandleChange(e)}
            value={confirmContraseña}
            name="confirmContraseña"
            id="confirmContraseña"
            type="password"
            placeholder="Confirma contraseña..."
            autoComplete="off"
          />
          <div>
            <button className="btn" type="submit">
              {loading ? "Cargando..." : "Registrarme"}
            </button>
          </div>

          <p>
            Ya tienes una cuenta?{" "}
            <b onClick={() => navigate("/login")}>Inicia Sesión!</b>
          </p>
          {mensaje && <div>{mensaje}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;

