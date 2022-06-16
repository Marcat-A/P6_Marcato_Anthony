const express = require("express");
const router = express.Router();
// Importations

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const SauceCtrl = require("../controllers/sauceControllers");
const likeCtrl = require("../controllers/like");
// Middlewares & Controllers

router.post("/", auth, multer, SauceCtrl.createSauce);
router.put("/:id", auth, multer, SauceCtrl.updateSauce);
router.get("/", auth, SauceCtrl.getAllSauces);
router.get("/:id", auth, SauceCtrl.getOneSauce);
router.delete("/:id", auth, SauceCtrl.deleteSauce);
router.post("/:id/like", auth, likeCtrl.likeSauce);
// Routes CRUD avec vérifications

module.exports = router;
