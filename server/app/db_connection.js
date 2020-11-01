// SoC: le role de ce fichier est UNIQUEMENT de
// fournir une connexion ouverte à la BDD
const Sequelize = require('sequelize');

// On instancie la connection
const dbConnection = new Sequelize(process.env.PG_URL, {
    logging: false
});
module.exports = dbConnection;