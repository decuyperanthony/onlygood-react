// on require en premier
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const session = require("express-session");
const morgan = require("morgan");


// https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
const cors = require("cors");
// pour la sécurité
const sanitiser = require("./app/middleware/sanitise");
const router = require("./app/router");

const app = express();

app.use(morgan());

app.use(cors());
// ce middleware là cree app.body
// A RAJOUTER OBLIGATOIREMENT avant le router, sinon les données POST ne sont pas dispos dans le router
// on rajoute le middleware qui récupère les données POST
app.use(
  express.urlencoded({
    extended: true
  })
);

// on rajoute multer pour les formulaires au format "multipart"
const multer = require("multer");
const bodyParser = multer();

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use(bodyParser.none());

// moteur de template // moteur de views
// app.set("view engine", "ejs");
// app.set("views", "views");

// Pour se servir des sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);

// ici req.body existe deja grace à url encoded
// on veut donc l 'assainir avant de passer au router
app.use(sanitiser);

const flash = require("./app/middleware/flash");
app.use(flash);

// pour récuperer mes fichiers statiques (css js img)
app.use(express.static("public"));

const userMiddleware = require("./app/middleware/user");
app.use(userMiddleware);

// j'utilise mon fichier router
app.use(router);

app.listen(PORT, () => {
  console.log("Server ready, listening on port " + PORT);
});