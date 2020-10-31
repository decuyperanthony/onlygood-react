const Sequelize = require("sequelize");

const dbConnection = require("../db_connection");

const moment = require("moment");
// pour avoir momentJS en francais
moment.locale('fr');

class Message extends Sequelize.Model {

  getGoodHour() {
    return moment(this.created_at).fromNow();
  }


}

Message.init({
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  attachment: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize: dbConnection,
  tableName: "messages",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Message;