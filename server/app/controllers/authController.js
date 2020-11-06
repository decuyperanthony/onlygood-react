// const User = require("../models/user");
const User = require('../models/user');

// une libraire pour tester le format des email
const emailValidator = require("email-validator");

// bcrypt, pour HASHER les mots de passer
const bcrypt = require("bcrypt");

// nodemailer une librairie pour recevoir un mail à l'inscription
const nodemailer = require("nodemailer");

const authController = {
  // afficher le formulaire de connexion
  // loginPage: (req, res) => {
  //   res.render("login");
  // },

  // traiter le formulaire de connexion
  loginAction: async (req, res) => {
    console.log('bjr')
    try {
      const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
      where: {
       email
      }
    });

    if (!user) {
      res.status(401).send({
          message: 'cet email n\'existe pas'
      }).end();
    } else {
      let testPass = "";
        if (user) {
         testPass = bcrypt.compareSync(password, user.password);
        }

        if (user && testPass) {
          res.send({
            user,
            // userToken,
            // userList
        });
        } else {
          console.log('<< 401 UNAUTHORIZED');
          console.log('<< mot de passe incorrect');
          res.status(401).send({
              message: 'mot de passe incorrect'
          }).end();
        }
    }


      // // récupérer les infos du formulaire
      // const {
      //   email,
      //   password
      // } = req.body;
      // // const email = req.body.email;
      // // const password = req.body.password;
      // console.log('email', email);
      // // //! ici
      // // // tenter de récupérer un utilisateur via l'email fourni
      // const user = await User.findOne({
      //   where: {
      //     email: email
      //     // ici, {email} aurait été sufiisant, et équivalent
      //   }
      // });

      // console.log('user', user)

      // // // si il n'existe pas => error
      // // if (!user) {
      // //    res.send({
      // //     error: "Cet email n'existe pas"
      // //   });
      // // }

      // // // si il existe, on vérifie le mot de passe
      // // if (!bcrypt.compareSync(password, user.password)) {
      // //   // si le mdp n'est pas bon => error
      // //    res.send({
      // //     error: "Mauvais mot de passe"
      // //   });
      // // }

      // // // sinon, on est tout bon => on ajoute l'utilisateur dans la session
      // // // req.session.user = user; // et c'est tout !
      // // // et on redirige vers "/"
      // // res.send(user);
      // res.send('ok')

    } catch (error) {
      console.trace(error);
      res.status(500).render({
          error
      });
    }
  },

  // afficher le formulaire d'inscription
  signupPage: (req, res) => {
    res.render("signup");
  },

  // traiter le formulaire d'inscription => enregistrer un nouveau User
  signupAction: async (req, res) => {

    try {
      const {
        email,
        password,
        firstname,
        lastname,
      } = req.body;
      console.log('email', email)
      // on verif que l'user n'existe pas avec son mail
      const user = await User.findOne({
        where: {
            email
        }
      });
       // on se prépare une liste d'erreur
       let errorsList = [];
       // si on trouve un user => le mail existe
       if (user) {
           errorsList.push("Cet email existe déjà");
       }
       if (!firstname) {
           errorsList.push("Le prénom ne peut pas être vide");
       }
       if (!lastname) {
           errorsList.push("Le nom ne peut pas être vide");
       }
       if (!emailValidator.validate(email)) {
           errorsList.push(
               "Le format du mail est incorrect"
           );
       }
       if (password.length < 8) {

           errorsList.push(
             "Le mot de passe doit contenir un minimum de 8 caractères"
           );
       }
       if (errorsList.length === 0) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let newUser = new User(req.body);
        let savedUser = await newUser.save();
        // const userToken = jwtUtils.generateTokenForUser(savedUser);
        savedUser.messagePositif = 'bien ouej poto';


        res.status(200).send({
            savedUser,
            // userToken
        });
        // res.status(200).send(savedUser);
        } else {

          res.send({errorsList});
          // res.status(401).send({errorsList});

        }
      //! ------------- Envoi du mail
      // var transporter = nodemailer.createTransport({
      //   service: "hotmail",
      //   auth: {
      //     user: process.env.SENDER_EMAIL,
      //     pass: process.env.SENDER_PASSWORD
      //   }
      // });
      // var mailOptions = {
      //   from: "decuyperanthony@hotmail.com",
      //   to: newUser.email,
      //   subject: "Thanks to signup on onlyGood",
      //   text: `Hello ${newUser.firstname} ${newUser.lastname} `
      // };
      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log("Email sent: " + info.response);
      //   }
      // });
      //! ------------- Envoi du mail
    } catch (error) {
      console.trace(error);
      res.status(500).send({
        error
      });
    }
  },

  logout: (req, res) => {
    delete req.session.user;
    res.redirect("/");
  }
};

module.exports = authController;