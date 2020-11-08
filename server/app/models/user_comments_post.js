const Sequelize = require('sequelize');

const dbConnection = require('../db_connection');

class User_comments_post extends Sequelize.Model {

};

User_comments_post.init({
    app_users_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    picture: {
        type: Sequelize.TEXT,
        allowNull: true
    },
}, {
    sequelize: dbConnection,
    tableName: "user_comments_post",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = User_comments_post;