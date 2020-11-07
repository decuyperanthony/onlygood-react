const Sequelize = require('sequelize');

const dbConnection = require('../db_connection');

class User_likes_post extends Sequelize.Model {

};

User_likes_post.init({
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
    tableName: "user_likes_post",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = User_likes_post;