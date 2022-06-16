const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const sauceRoutes = require("./routes/sauceRoute");
const userRoutes = require("./routes/userRoute");

const morgan = require("morgan");

// mongoSanitize empêche l'injection de SQL dans la BDD
const mongoSanitize = require("express-mongo-sanitize");

const path = require("path");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.yubck.mongodb.net/api",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(morgan("dev"));
app.use((req, res, next) => {
  // Header qui permet à d'accéder à notre API depuis n'importe quelle origine ('*')
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Ajout des headers suivant aux requête envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  // Envoyer les requêtes avec les méthodes (GET, POST, PUT ...)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use(express.json());

app.use(bodyParser.json());

//protection injection sql qui remplace les caractères interdits "$" et "." par _
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Gestion static qui permet les requêtes des images du répertoire /images indiqué au module Path
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
