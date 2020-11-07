// == Require express
const express = require('express');

// == controller
const userController = require('../controllers/userController');

const router = express.Router();

//* ----- ROUTE DES USERS -----
router.get(`/users`, userController.getAllUsers);
router.get(`/user/:id`, userController.getOneUser);
// router.get(`/${process.env.API_URL}/usersdetails`, userController.getAllUsersDetails);
// router.get(`/${process.env.API_URL}/userdetails/:id`, userController.getOneUserDetails);
// router.get(`/${process.env.API_URL}/userdetail/:id`, userController.getOneUserDetail);
// router.patch(`/${process.env.API_URL}/user/:id`, userController.updateUser);
// router.delete(`/${process.env.API_URL}/user/:id`, userController.deleteUser);


module.exports = router;