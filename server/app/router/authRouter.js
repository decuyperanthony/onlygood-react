// == Require express
const express = require('express');

// controller
const authController = require('../controllers/authController');

const router = express.Router();

router.post("/login", authController.loginAction);

// page signup
// router.get('/signup', authController.signupPage);
router.post("/signup", authController.signupAction);

module.exports = router;