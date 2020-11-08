// == Require express
const express = require('express');

// == controller
const impressionController = require('../controllers/impressionController');

const router = express.Router();

//* ----- ROUTE DES RELATION USER LIKES POST -----
router.post(`/userlikespost`, impressionController.addOrRemoveLikeToPost);
// router.delete(`/userunlikespost/:id`, userLikesPostController.removeLikeFromPost);

//* ----- ROUTE DES RELATION USER SAVED POST -----
router.post(`/usersavedpost`, impressionController.addOrRemoveSaveToPost);
// router.delete(`/userunlikespost/:id`, userLikesPostController.removeLikeFromPost);

//* ----- ROUTE DES RELATION USER RETWEET POST -----
router.post(`/userretweetpost`, impressionController.addOrRemoveRetweetToPost);
// router.delete(`/userunlikespost/:id`, userLikesPostController.removeLikeFromPost);


module.exports = router;