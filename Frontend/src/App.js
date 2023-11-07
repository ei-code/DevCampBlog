import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/main.scss";

import Navigation from './components/navigation';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/newPassword';
import Blog from './components/blog';
import NoMatch from "./components/no-match";

library.add(faPenToSquare, faRocket);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica para iniciar sesión
    setLoggedIn(true);
  };
  // Verificar si el usuario está autenticado desde localStorage
  const isUserAuthenticated = () => {
    return localStorage.getItem("loggedIn") === "true";
  };
  
  useEffect(() => {
    // Verificar si el usuario está autenticado desde localStorage
    setLoggedIn(isUserAuthenticated);
  }, []);

  useEffect(() => {
    // Función para mostrar los valores de localStorage
    const checkLocalStorage = () => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`localStorage[${key}] = ${value}`);
      }
    };
    // Llamar a la función para mostrar los valores de localStorage
    checkLocalStorage();
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <header className="navbar">
          <Navigation loggedIn={loggedIn}  />
        </header>
          <Routes>
            <Route path="/" exact element={<Blog />} />
            <Route path="/Login" element={<Login onLogin={handleLogin} />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/newPassword/:token" element={<ResetPassword />} />
            <Route path="/welcome" element={<Welcome loggedIn={loggedIn} />} />
            <Route path="*" component={<NoMatch />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;





  
  
  