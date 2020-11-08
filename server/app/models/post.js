const Sequelize = require("sequelize");

const dbConnection = require("../db_connection");

const moment = require("moment");
// pour avoir momentJS en francais
moment.locale('fr');

class Post extends Sequelize.Model {

  getGoodHour() {
    return moment(this.created_at).fromNow();
  }


}

Post.init({
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  picture: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.TEXT,
    allowNull: true
  },
}, {
  sequelize: dbConnection,
  tableName: "post",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Post;