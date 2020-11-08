// == Require express
const express = require('express');

// == controller
const impressionController = require('../controllers/impressionController');

const router = express.Router();

//* ----- ROUTE DES RELATION USER LIKES POST -----
router.post(`/userlikespost`, impressionController.addOrRemoveLikeToPost);

//* ----- ROUTE DES RELATION USER SAVED POST -----
router.post(`/usersavedpost`, impressionController.addOrRemoveSaveToPost);

//* ----- ROUTE DES RELATION USER RETWEET POST -----
router.post(`/userretweetedpost`, impressionController.addOrRemoveRetweetToPost);

//* ----- ROUTE DES RELATION USER comment POST -----
router.get(`/comments`, impressionController.getAllComments)
router.get(`/commentbypostid`, impressionController.getCommentByPostId);
router.post('/usercommentspost', impressionController.addOrRemoveCommentToPost)

module.exports = router;