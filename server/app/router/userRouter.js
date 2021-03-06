// == Require express
const express = require('express');

// == controller
const userController = require('../controllers/userController');

const router = express.Router();

// multer
const upload = require('../middleware/multer');

//* ----- ROUTE DES USERS -----
router.get(`/users`, userController.getAllUsers);
router.get(`/user/:id`, userController.getOneUser);
// router.get(`/${process.env.API_URL}/usersdetails`, userController.getAllUsersDetails);
// router.get(`/${process.env.API_URL}/userdetails/:id`, userController.getOneUserDetails);
// router.get(`/${process.env.API_URL}/userdetail/:id`, userController.getOneUserDetail);
router.patch(`/user/:id`, upload.single("image"), userController.updateUser);
router.patch(`/user/:id/updatepictureheader`, upload.single("image"), userController.updatePictureHeader);
// router.delete(`/${process.env.API_URL}/user/:id`, userController.deleteUser);


module.exports = router;