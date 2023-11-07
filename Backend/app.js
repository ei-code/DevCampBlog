const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const path = require("path");

const cors = require("cors");
const Usuario = require("./model/usuario");
const controllers = require("./controllers");
const verifyToken = require("./middlewares/verifyToken");
const app = express();
mongoose.set("strictQuery", false);

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
};

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Database URI:
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.5pgmd8c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Base de datos conectada");

    // Configura Express para servir archivos estáticos del frontend
    app.use(express.static(path.join(__dirname, "Frontend/build")));

    // Rutas
    app.get("/user", verifyToken, controllers.getUserById);
    
    app.post("/register", controllers.register);
    app.post("/login", controllers.login);
    app.post("/forgot-password", controllers.passwordRecovery);
    app.post("/new-password", controllers.newpassword);
    app.post("/new-post", controllers.newPost);
    app.get("/publicaciones", controllers.publicaciones);
    app.get("/blog-detail", controllers.getBlogItem);

    // Ruta para servir el archivo index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    app.listen(PORT, function () {
      console.log(`App listening on ${PORT}`);
    });
  })
  .catch((e) => console.log(e));