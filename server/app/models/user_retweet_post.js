const Sequelize = require('sequelize');

const dbConnection = require('../db_connection');

class User_retweet_post extends Sequelize.Model {

};

User_retweet_post.init({
    app_users_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    sequelize: dbConnection,
    tableName: "user_retweet_post",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = User_retweet_post;