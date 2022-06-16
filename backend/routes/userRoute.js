const express = require("express");
const router = express.Router();
// Importations

const password = require("../middleware/password");
const mail = require("../middleware/email");
const userCtrl = require("../controllers/userControllers");
// Middlewares & controllers

router.post("/signup", mail, password, userCtrl.signup);
router.post("/login", userCtrl.login);
// Routes post avec vérifications

module.exports = router;
