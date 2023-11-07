import { useEffect } from "react";
import axios from "axios";

const TokenHandler = ({ setLoggedIn, setName, setUserId }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`http://localhost:4000/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => {
          setName(data.nombre);
          setLoggedIn(true);
          setUserId(data.id); // Establece el ID del usuario
          console.log("ID del usuario:", data.id);
        })
        .catch((error) => {
          console.error(error);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn, setName, setUserId]);

  return null;
};
export default TokenHandler;