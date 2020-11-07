const express = require("express");

//middleware
// const isAdmin = require('../middleware/isAdmin');
// const isLoggin = require('../middleware/isLoggin');
// const flash = require('./middleware/flash');


// Controller
// const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');
// const adminController = require('../controllers/adminController');



const router = express.Router();


router.get('/', (req, res) => {
    res.send('onlygood')
    console.log('bienvenue')
})
// page login
// router.get("/login", authController.loginPage);




//page profil
// router.get('/userPage', isLoggin, userController.userPage);



module.exports = router;