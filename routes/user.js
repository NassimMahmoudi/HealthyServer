const express = require("express");
const userController = require("../controllers/user.controller.js");

const router = express.Router();


// auth
router.post("/register", userController.signUp);
router.post("/login", userController.signIn);

module.exports = router;