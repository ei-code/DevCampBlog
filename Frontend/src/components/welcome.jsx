import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPost from "./new-post";

const Welcome = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(""); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => {
          if (data.userId) {
            setName(data.nombre);
            setUserId(data.userId); 
          }
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  return (
    <div className="form-wrapper">
      <div>
        <h3>{name ? `Bienvenido, comparte un post ${name}!!!` : "No estas logeado, no puedes publicar ;)"}</h3>
      </div>
          <NewPost userId={userId} />
    </div>
  );
};
export default Welcome;