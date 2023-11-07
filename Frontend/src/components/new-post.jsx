import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPost = ({ userId }) => {
  const [inputs, setInputs] = useState({
    titulo: '',
    subtitulo: '',
    contenido: '',
    imagenURL: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const { titulo, subtitulo, imagenURL, contenido } = inputs;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (titulo && subtitulo && contenido) {
      const publicacion = {
        titulo,
        subtitulo,
        imagenURL,
        contenido,
        fecha: new Date().toISOString(),
        userId, 
      };
      setLoading(true);

      console.log("Publicación antes de enviar:", publicacion); // Agregado para depuración

      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/new-post`, publicacion)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({
            titulo: '',
            subtitulo: '',
            imagenURL: '',
            contenido: '',
          });
          setTimeout(() => {
            setMensaje('');
            navigate('/');
          }, 1500);
        })
        .catch((error) => {
          console.error("Error al enviar la publicación:", error); // Agregado para depuración
          setMensaje('Hubo un error');
          setTimeout(() => {
            setMensaje('');
          }, 1500);
        });

      console.log("Publicación después de enviar:", publicacion); // Agregado para depuración

      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => onSubmit(e)} className="form-imputs">
        <h2>Compartir un post!</h2>
        <input
          onChange={(e) => handleChange(e)}
          value={titulo}
          name="titulo"
          id="titulo"
          type="text"
          placeholder="Título..."
          autoComplete="off"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={subtitulo}
          name="subtitulo"
          id="subtitulo"
          type="text"
          placeholder="Subtítulo..."
          autoComplete="off"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={imagenURL}
          type="text"
          name="imagenURL"
          id="imagenURL"
          placeholder="Ingrese la URL de la imagen..."
          autoComplete="off"
        />
        <textarea
          onChange={(e) => handleChange(e)}
          value={contenido}
          name="contenido"
          id="contenido"
          placeholder="Contenido..."
        />
        <div className="btn">
          <button className="btn" type="submit">
            {loading ? 'Cargando...' : 'Publicar'}
          </button>
        </div>
        {mensaje && <div>{mensaje}</div>}
      </form>
    </div>
  );
};

export default NewPost;