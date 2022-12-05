const express = require("express");
const userController = require("../controllers/user.controller.js");

const router = express.Router();


// auth
router.get("/", userController.getAllUsers);
router.post("/register", userController.signUp);
router.post("/login", userController.signIn);
router.post("/details", userController.addDetails);

module.exports = router;