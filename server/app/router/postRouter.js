// == Require express
const express = require('express');

// == controller
const postController = require('../controllers/postController');

const router = express.Router();

// multer
const upload = require('../middleware/multer');

//* ----- ROUTE DES POST -----
router.get(`/posts`, postController.getAllPosts);
router.get(`/post/:id`, postController.getOnePost);
router.post(`/post`, upload.single("image"), postController.addPost);
// router.get(`/${process.env.API_URL}/usersdetails`, userController.getAllUsersDetails);
// router.get(`/${process.env.API_URL}/userdetails/:id`, userController.getOneUserDetails);
// router.get(`/${process.env.API_URL}/userdetail/:id`, userController.getOneUserDetail);
router.patch(`/post/:id`, postController.updatePost);
router.delete(`/post/:id`, postController.removePost);
// router.delete(`/${process.env.API_URL}/user/:id`, userController.deleteUser);

//* ROUTE POUR AVOIR LES TWEET DUN USERID EN FONCTION DE SES LIKES, SAVED RETWEET ETC...
// router.get('/tweetpostuser/:id', postController.getUserPost);
router.get('/userpost/:id', postController.getPostByUserId);
router.get('/savedpostuser/:id', postController.getUserSavedPost);
router.get('/likedpostuser/:id', postController.getUserLikedPost);
router.get('/commentedpostuser/:id', postController.getUserCommentedPost);
//* get and count
router.get('/userpostandcount/:id', postController.getPostByUserIdAndCount);

module.exports = router;