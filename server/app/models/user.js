const Sequelize = require('sequelize');

const dbConnection = require('../db_connection');

const moment = require("moment");
// pour avoir momentJS en francais
moment.locale('fr');

class User extends Sequelize.Model {

    getFullName() {
        return this.firstname + ' ' + this.lastname;
    };

    getGoodDate() {
        return moment(this.created_at).fromNow();
    }
};

User.init({
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    firstname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    role: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'user'
    },
    picture_road: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: "avatar.png"
    }
}, {
    sequelize: dbConnection,
    tableName: "app_users",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = User;