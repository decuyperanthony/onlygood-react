const Message = require("./message");
const User = require("./user");

/* Associations */

//  Asso user <-> message

Message.belongsTo(User, {
  foreignKey: "app_users_id",
  as: "user"
});

User.hasMany(Message, {
  foreignKey: "app_users_id",
  as: "message"
});

// ASSO message <-> user
// relation de type n:n
// un message peut etre liké par plusieurs utilisateurs
Message.belongsToMany(User, {
  through: "likes",
  foreignKey: "messages",
  otherKey: "app_users",
  timestamps: false,
  as: "likeby" // un message est liké par des users
});

User.belongsToMany(Message, {
  through: "likes",
  foreignKey: "app_users",
  otherKey: "messages",
  timestamps: false,
  as: "like" // un user "like" des messages
});

module.exports = {
  Message,
  User
};

/** La dernière poignée de pailette... */
// Quand on définit une association N:N, les modèles récupèrent des "méthodes magiques"
// dont on peut se servir pour créer de nouvelles relations
// Par exemple, pour dir "j'ajoute le tag 1 au quizz 4"
// Quiz.findByPk(4).then(quiz => { // je récupère le quiz

//   Tag.findByPk(1).then(tag => { // je récupère le tag

//     quiz.addTag(tag); // et paf !
//     quiz.save();

//     quiz.removeTag(tag); // et hop, je l'enlève

//   });

// })

// ASSO message <-> user
// relation de type n:n
// un message peut etre liké par plusieurs utilisateurs
// MAIS ÇA, c'est la relation "like" ...
// Message.belongsToMany(User, {
//     through: "likes",
//     foreignKey: "messages",
//     otherKey: "app_users",
//     timestamps: false,
//     as: "likes" // donc faut la nommer en conséquence
// });
// User.belongsToMany(Message, {
//     through: "likes",
//     foreignKey: "app_users",
//     otherKey: "messages",
//     timestamps: false,
//     as: "likes" // et la aussi
// });

// 2eme propal
// Message.belongsToMany(User, {
//     through: "likes",
//     foreignKey: "messages",
//     otherKey: "app_users",
//     timestamps: false,
//     as: "likedBy" // un message "est liké par" des Users
// });
// User.belongsToMany(Message, {
//     through: "likes",
//     foreignKey: "app_users",
//     otherKey: "messages",
//     timestamps: false,
//     as: "likes" // un user "likes" des messages
// });
