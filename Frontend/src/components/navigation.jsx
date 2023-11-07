import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = ({ loggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token y otros datos de autenticación del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("name");
    
    setTimeout(() => {
      navigate("/blog");
    }, 500); 
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="logo">
          <img src="/Proyecto DevCamp (1).png" alt="Logo de la aplicación" />
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/" exact={true}>
            Blog
          </NavLink>
        </div>
       
        {loggedIn && (
          <div className="nav-link-wrapper" >
            <NavLink to="/welcome" className="icon" >
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </NavLink>
          </div>
        )}
          
      </div>

      <div className="right-side">
        {!loggedIn ? (
          <>
            <div className="nav-link-wrapper">
              <NavLink to="/Register" activeClassName="nav-link-active">
                Register
              </NavLink>
            </div>
            <div className="nav-link-wrapper">
              <NavLink to="/Login" activeClassName="nav-link-active">
                Login
              </NavLink>
            </div>
          </>
        ) : (
          <div className="nav-link-wrapper">
            <a href="/" onClick={handleLogout} className="icon">
              <FontAwesomeIcon icon="fa-solid fa-rocket" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;