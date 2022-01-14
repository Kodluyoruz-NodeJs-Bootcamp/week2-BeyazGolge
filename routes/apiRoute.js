const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();
const { auth } = require("../middlewares/auth");

router.route("/login").post(apiController.loginUser);
router.route("/logout").get(auth, apiController.logoutUser);
router.route("/register").post(apiController.registerUser);
router.route("/dashboard").get(auth, apiController.getDashboardPage);

module.exports = router;
