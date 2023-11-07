import React, { Component } from "react";
import axios from "axios";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogItem: {}
    };
  }

  componentDidMount() {
    // Asegúrate de que props.route.params exista antes de acceder a props.route.params.id
    if (this.props.route.params) {
      const { id } = this.props.route.params;


      // Utiliza el id de la ruta en la URL de la solicitud
      axios
        .get(`http://localhost:4001/publicaciones/${id}`)
        .then(response => {
          this.setState({
            blogItem: response.data
          });
        })
        .catch(error => {
          console.log("Error al obtener datos de la API:", error); // Agrega un console.log para mostrar errores
        });
    } else {
      console.log("No se encontraron propiedades de ruta"); // Agrega un console.log para manejar el caso en que no haya propiedades de ruta
    }
  }

  render() {
    const {
      fechaPublicacion,
      nombre,
      apellido,
      titulo,
      subtitulo,
      contenido,
      imagenURL,
    } = this.state.blogItem;

    console.log("Datos del artículo del blog:", this.state.blogItem); // Agrega un console.log para mostrar los datos del artículo del blog

    return (
      <div className="blog-container">
        <div className="content-container">
          <h1>{titulo}</h1>
          <div className="content">{subtitulo}</div>
          <div className="featured-image-wrapper">
            <img src={imagenURL} alt="Featured Image" />
          </div>
          <div className="content">{contenido}</div>
        </div>
      </div>
    );
  }
}
