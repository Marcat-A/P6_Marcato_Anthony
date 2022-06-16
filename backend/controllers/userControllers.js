const bcrypt = require("bcrypt"); // Module cryptage/decryptage du mot de passe
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cryptojs = require("crypto-js"); // Module pour cryptage/decryptage de l'email
require("dotenv").config();
// Imports

exports.signup = (req, res, next) => {
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  bcrypt
    .hash(req.body.password, 10) // Le 10 est le salt, nombre de fois de hashage
    .then((hash) => {
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs
    .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
    .toString();

  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
