const Sequelize = require('sequelize');

const dbConnection = require('../db_connection');

class Relationship extends Sequelize.Model {

};

Relationship.init({

}, {
    sequelize: dbConnection,
    tableName: "relationship",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = Relationship;