// je les requir comme ça ppur avoir le fichier index en vrai
// et donc les models associeés

const {
  User,
  Message
} = require("../models");

const mainController = {
  homePage: async (req, res) => {
    try {
      let messages = await Message.findAll({
        include: ["user"],
        limit: 10,
        order: [
          ["created_at", "DESC"]
        ]
      });
      let users = await User.findAll();
      res.render("accueil", {
        username: req.session.username,
        messages,
        users
      });
    } catch (error) {
      console.trace(error);
    }
  },

  addPost: async (req, res) => {
    console.log(req.body);
    if (req.body.message === undefined || req.body.message === "" || req.body.message === " ") {
      req.flash("error", "Vous n'avez pas posté de message");
      res.redirect("/");
    } else {
      try {
        // on recupère le message
        const message = req.body.message;
        console.log(message);
        // on crée un nouveau message pour la bdd
        const newMessage = new Message();
        newMessage.content = message;
        newMessage.app_users_id = req.session.user.id;
        await newMessage.save();
        req.flash("success", "Merci pour votre message");
        res.redirect("/");
      } catch (error) {
        console.trace(error);
        res.status(500).render("500");
      }
    }
  },

  // myUser.addLike(myMessage) => hop un like
  // myUser.removeLike(myMessage) => hop on delike
  // myUser.hasLike(myMessage) => retourne un boolean

  //donc ta route, c'est  : si la relation existe, je l'enlève, sinon je la met, et hop on réaffiche le tout
  addLike: async (req, res) => {
    let userId = req.session.user.id;
    console.log('req.session.user.id', req.session.user.id);
    const messageId = req.params.id;
    console.log(messageId);
    try {
      // on recup l'utilisateur
      let myUser = await User.findByPk(userId);
      console.log('myUser', myUser);
      // on recupere le message ayant l'id messageId
      let myMessage = await Message.findByPk(messageId);
      console.log(myMessage.likes);
      // on tente d'associer un like à un message
      // myMessage.likes += 1;
      console.log('myUser.hasLike(myMessage)', myUser.hasLike(myMessage));
      if (myUser.hasLike(myMessage)) {
        myUser.removeLike(myMessage)
      } else {
        myUser.addLike(myMessage)
      }

      await myMessage.save();
      console.log(myMessage.likes);
      res.redirect("/");
    } catch (error) {
      console.trace(error);
      res.status(500).render("500");
    }
  },

  // addLike: async (req, res) => {
  //   const messageId = req.params.id;
  //   console.log(messageId);
  //   try {
  //     // on recupere le message ayant l'id messageId
  //     let message = await Message.findByPk(messageId);
  //     console.log(message.likes);
  //     // on tente d'associer un like à un message

  //     message.likes += 1;
  //     await message.save();
  //     console.log(message.likes);
  //     res.redirect("/");
  //   } catch (error) {
  //     console.trace(error);
  //     res.status(500).render("500");
  //   }
  // },

  notFound: (req, res) => {
    res.status(404).render("404");
  }
};

module.exports = mainController;