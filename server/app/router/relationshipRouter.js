// == Require express
const express = require('express');

// == controller
const relationshipController = require('../controllers/relationshipController');

const router = express.Router();

//* ----- ROUTE DES RELATION FOLLOWER FOLLOWED -----
router.get(`/relationships`, relationshipController.getAllRelationships);
router.get(`/relationship/:id`, relationshipController.getOneRelationship);
router.post(`/relationship`, relationshipController.addOrRemoveRelationship);
// router.patch(`/relationship/:id`, postController.updatePost);
// router.delete(`/relationship/:id`, relationshipController.removeRelationship);


module.exports = router;