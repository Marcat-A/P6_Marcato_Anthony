const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Utilisation de multer pour enregistrer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // Chemin vers ou le fichier va aller
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
  // Nom du fichier
});

module.exports = multer({ storage: storage }).single("image");
