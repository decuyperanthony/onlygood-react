// == Require express
const express = require('express');

// == controller
const relationshipController = require('../controllers/relationshipController');

const router = express.Router();

//* ----- ROUTE DES USERS -----
router.get(`/relationships`, relationshipController.getAllRelationships);
// router.get(`/relationship/:id`, postController.getOnePost);
// router.post(`/relationship`, postController.addPost);
// router.patch(`/relationship/:id`, postController.updatePost);
// router.delete(`/relationship/:id`, postController.removePost);


module.exports = router;