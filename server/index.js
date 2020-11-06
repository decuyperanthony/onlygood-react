// on require en premier
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
// const morgan = require("morgan");
// const cors = require("cors");
const PORT = process.env.PORT || 3000;
// const PORT = 3000;

// pour la sécurité
const sanitiser = require("./app/middleware/sanitise");
const userRouter = require('./app/router/userRouter');
const authRouter = require('./app/router/authRouter');

const router = require("./app/router/router");

const app = express();

// app.use(morgan());

// app.use(cors());
// ce middleware là cree app.body
// A RAJOUTER OBLIGATOIREMENT avant le router, sinon les données POST ne sont pas dispos dans le router
// on rajoute le middleware qui récupère les données POST
// app.use(
//   express.urlencoded({
//     extended: true
//   })
// );

app.use(bodyParser.json());

// on rajoute multer pour les formulaires au format "multipart"
const multer = require("multer");
const userController = require("./app/controllers/userController");
// const bodyParser = multer();

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
// === body parser
app.use(bodyParser.json()); // => req.body va contenir le JSON de la req
// ou
// app.use(bodyParser.urlencoded({extended: false}))

//! === reglage cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  if (req.method === "OPTIONS") {
      return res.status(200).send("OK");
  }
  next();
});
// app.use(cors({credentials: true, origin: 'http://localhost:8000'}));

// moteur de template // moteur de views
// app.set("view engine", "ejs");
// app.set("views", "views");

// Pour se servir des sessions
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60
//     }
//   })
// );
app.use(
  session({
    secret: "I am the secret of Tribz from Bifröst",
    saveUninitialized: true,
    resave: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use(
  express.urlencoded({
      extended: true
  })
);

// ici req.body existe deja grace à url encoded
// on veut donc l 'assainir avant de passer au router
app.use(sanitiser);

// app.set("view engine", "ejs");

// const flash = require("./app/middleware/flash");
// app.use(flash);

// pour récuperer mes fichiers statiques (css js img)
app.use(express.static("public"));
app.set("views", "./views");

// const userMiddleware = require("./app/middleware/user");
// app.use(userMiddleware);

// j'utilise mon fichier router en dernier
app.use(authRouter);
app.use(userRouter);
app.use(router);

app.listen(PORT, () => {
  console.log("Server ready, listening on port " + PORT);
});