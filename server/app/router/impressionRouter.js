// == Require express
const express = require('express');

// == controller
const impressionController = require('../controllers/impressionController');

const router = express.Router();

//* ----- ROUTE DES RELATION USER LIKES POST -----
router.post(`/userlikespost`, impressionController.addOrRemoveLikeToPost);
// router.delete(`/userunlikespost/:id`, userLikesPostController.removeLikeFromPost);


module.exports = router;