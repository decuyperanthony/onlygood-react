// const {
//     User,
//     Message
// } = require('../models');

// // const Message = require('../models/message');

// const adminController = {
//     adminPage: async (req, res) => {
//         // permet de voir tous les utilisateurs
//         // et les commentaires du livre or
//         try {
//             let user = await User.findByPk(req.session.user.id);
//             let allUser = await User.findAll();
//             let allMessages = await Message.findAll();
//             res.render('admin', {
//                 user,
//                 allUser,
//                 allMessages
//             })
//         } catch (error) {
//             console.trace(error)
//         }
//     },
//     // méthode pour remove un user dans la route /admin
//     removeUser: async (req, res) => {
//         let idUserToRemove = req.body.user;
//         console.log(idUserToRemove);
//         try {
//             // on find le user
//             let userToRemove = await User.findByPk(idUserToRemove);
//             console.log(userToRemove);
//             userToRemove.destroy();
//             res.redirect('admin');
//         } catch (error) {
//             console.trace(error);
//         }
//     },
//     // méthode pour remove le message dans la route / amdin
//     removeMessage: async (req, res) => {
//         let idMessageToRemove = req.body.removeMessage;
//         try {
//             let messageToRemove = await Message.findByPk(idMessageToRemove);
//             messageToRemove.destroy();
//             res.redirect('/admin');
//         } catch (error) {
//             console.trace(error);
//         }
//     }
// };

// module.exports = adminController;