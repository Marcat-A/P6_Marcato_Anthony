const passwordValidator = require("password-validator");
const mongooseError = require("mongoose-error");
// Importations

// Création du schema
let passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8) // Une longueur minimum de 8 caractères
  .is()
  .max(25) // Une longueur maximum de 25 caractères
  .has()
  .uppercase() // Doit avoir des lettres majuscules
  .has()
  .lowercase() // Doit avoir des lettres minuscules
  .has()
  .digits(2) // Doit avoir au moins 2 chiffres
  .has()
  .not()
  .spaces(); // Ne doit pas comporter d'espaces

// Vérification si le mot de passe est assez sécurisé
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return mongooseError(
      res.status(403).json({
        message:
          "Merci d'utiliser un mot de pass plus sécurisé : entre 8 et 25 caractères, une majuscule et deux chiffres minimum.",
      })
    );
  } else {
    next();
  }
};
