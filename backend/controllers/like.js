const Sauce = require("../models/sauce");
// Import du model

exports.likeSauce = (req, res, next) => {
  const sauceLikeObject = req.body;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like == 1) {
        // L'userId n'est pas présent dans la BDD donc ajout du like

        // Mise à jour de l'objet sauce dans BDD
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(201).json({ message: "Sauce aimée par l'utilisateur" })
          )
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
      // Si l'utilisateur retire son like
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like == 0) {
        // Mise à jour de la sauce
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(201).json({ message: "Remise à zero des likes" })
          )
          .catch((error) => {
            res.status(400).json({ error });
          });
      }

      // Si l'utilisateur dislike
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like == -1
      ) {
        // Mise à jour de l'objet sauce dans BDD
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },

            _id: req.params.id,
          }
        )
          .then(() =>
            res
              .status(201)
              .json({ message: "Sauce pas aimée par l'utilisateur" })
          )
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
      // Si l'utilisateur enlève son dislike
      if (sauce.usersDisliked.includes(req.body.userId) && req.body.like == 0) {
        // Mise à jour de la sauce
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
            _id: req.params.id,
          }
        )
          .then(() =>
            res.status(201).json({ message: "Remise à zero des dislikes" })
          )
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
