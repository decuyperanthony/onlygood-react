// == Require express
const express = require('express');

// == controller
const postController = require('../controllers/postController');

const router = express.Router();

//* ----- ROUTE DES USERS -----
router.get(`/posts`, postController.getAllPosts);
router.get(`/post/:id`, postController.getOnePost);
router.post(`/post`, postController.addPost);
// router.get(`/${process.env.API_URL}/usersdetails`, userController.getAllUsersDetails);
// router.get(`/${process.env.API_URL}/userdetails/:id`, userController.getOneUserDetails);
// router.get(`/${process.env.API_URL}/userdetail/:id`, userController.getOneUserDetail);
router.patch(`/post/:id`, postController.updatePost);
router.delete(`/post/:id`, postController.removePost);
// router.delete(`/${process.env.API_URL}/user/:id`, userController.deleteUser);


module.exports = router;