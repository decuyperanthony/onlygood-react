const express = require("express");

//middleware
const isAdmin = require('./middleware/isAdmin');
const isLoggin = require('./middleware/isLoggin');
// const flash = require('./middleware/flash');


// Controller
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const messageController = require('./controllers/messageController');



const router = express.Router();

//page d'accueil
// router.get('/', isLoggin, mainController.homePage);
router.post("/", isLoggin, mainController.addPost);
router.get('/addlike/message/:id', isLoggin, mainController.addLike);
router.get('', () => {
    console.log('bienvenue')
})
// page login
// router.get("/login", authController.loginPage);
router.post("/login", authController.loginAction);

// page signup
router.get('/signup', authController.signupPage);
router.post("/signup", authController.signupAction);

//page profil
router.get('/userPage', isLoggin, userController.userPage);
router.post('/updateuser',
    userController.updateUser);
// router.patch('user/:id', userController.updateUser);

// page messagerue
router.get('/messages', isLoggin, messageController.messageHomePage)

router.get("/historique", isLoggin, (req, res) => {
    res.render("historique");
});

router.get("/evenement", isLoggin, (req, res) => {
    res.render("evenement");
});

//page admin
router.get('/admin', isLoggin, isAdmin, adminController.adminPage);
router.post('/removeuser', adminController.removeUser);
router.post('/removeMessage', adminController.removeMessage);
router.get("/logout", isLoggin, authController.logout);

// on definit le middleware 404 en dernier
router.use(mainController.notFound);


module.exports = router;