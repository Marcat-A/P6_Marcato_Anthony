const jwt = require("jsonwebtoken");
const mongooseError = require("mongoose-error");
require("dotenv").config();
// Importations

module.exports = (req, res, next) => {
  try {
    // Récupération du token dans le header Authorization: Bearer token

    const token = req.headers.authorization.split(" ")[1];
    // On "coupe" l'authorization et on prend le token en enlevant le Beared

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // Concordance du token récupéré et de celui dans le .env

    const userId = decodedToken.userId;
    // Récupération de l'userId

    if (req.body.userId && req.body.userId !== userId) {
      // Si la réponse est différente
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    mongooseError(
      res.status(401).json({ error: error || "Requête non authentifiée" })
    );
  }
};
