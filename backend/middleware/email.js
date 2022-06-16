const mongooseError = require("mongoose-error");

module.exports = (req, res, next) => {
  // Création de la regExp de l'email
  let email = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,5}[ ]{0,2}$",
    "g"
  );
  let testEmail = email.test(req.body.email);
  // Test de l'email

  if (!testEmail) {
    return mongooseError(
      res.status(403).json({
        message:
          "Erreur: L'adresse e-mail n'est pas conforme ex: contact@adresse.com !",
      })
    );
  } else {
    next();
  }
};
