import React from "react";

const BlogItem = props => {
  const {
    titulo,
    subtitulo,
    contenido,
    imagenURL,
    fechaPublicacion,
  } = props.blogItem;

  const fecha = new Date(fechaPublicacion);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const fechaFormateada = fecha.toLocaleDateString(undefined, options);

  return (
    <div className="blog-container">
      <div className="text-with-border">
        <h1>{titulo}</h1>
      </div>
      <div className="fecha">{fechaFormateada}</div>
      <div className="content-container">
        <div className="featured-image-wrapper">
          <img src={imagenURL} alt="ilustración del post" />
        </div>
        <h2 className="subtitulo">{subtitulo}</h2>
        <div className="content">{contenido}</div>
      </div>
    </div>
  );
}
export default BlogItem;