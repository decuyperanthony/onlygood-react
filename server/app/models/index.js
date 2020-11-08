const Post = require("./post");
const User = require("./user");
const Relationship = require('./relationship');
const User_likes_post = require('./user_likes_post');
const User_comments_post = require('./user_comments_post');
const User_retweet_post = require('./user_retweet_post');
const User_saved_post = require('./user_saved_post');

/* ----- Associations 1 to N ----- */

//  Asso user <-> post
Post.belongsTo(User, {
  foreignKey: "app_users_id",
  as: "author"
});
User.hasMany(Post, {
  foreignKey: "app_users_id",
  as: "posts"
});

// Asso user <-> relationship
Relationship.belongsTo(User, {
  foreignKey: "follower_id",
  as: "user_follower"
});
Relationship.belongsTo(User, {
  foreignKey: "followed_id",
  as: "user_followed"
});
User.hasMany(Relationship, {
  foreignKey: "follower_id",
  as: "follower"
});
User.hasMany(Relationship, {
  foreignKey: "followed_id",
  as: "followed"
});

//! relation between post and comment
User_comments_post.belongsTo(Post, {
  foreignKey: "post_id",
  as: "posts"
})
//un post peut avoir plusieurs commentaires
Post.hasMany(User_comments_post, {
  foreignKey: "post_id",
  as: "comments"
})

//! relation between comment and author
User_comments_post.belongsTo(User, {
  foreignKey: "app_users_id",
  as: "author"
})
//un post peut avoir plusieurs commentaires
User.hasMany(User_comments_post, {
  foreignKey: "app_users_id",
  as: "comments"
})


/* ----- Associations N to N ----- */
//! USER LIKES POST
// un user peut liker plusieurs posts
User.belongsToMany(Post, {
  through: "user_likes_post",
  foreignKey: "app_users_id",
  otherKey: "post_id",
  timestamps: false,
  as: "post_liked"
});

// un post peut être liké par plusieurs user
Post.belongsToMany(User, {
  through: "user_likes_post",
  foreignKey: "post_id",
  otherKey: "app_users_id",
  timestamps: false,
  as: "post_liked_by"
});

//! USER SAVED POST
// un user peut liker plusieurs posts
User.belongsToMany(Post, {
  through: "user_saved_post",
  foreignKey: "app_users_id",
  otherKey: "post_id",
  timestamps: false,
  as: "post_saved"
});

// un post peut être liké par plusieurs user
Post.belongsToMany(User, {
  through: "user_saved_post",
  foreignKey: "post_id",
  otherKey: "app_users_id",
  timestamps: false,
  as: "post_saved_by"
});

//! USER RETWEET POST
// un user peut reweet plusieurs posts
User.belongsToMany(Post, {
  through: "user_retweet_post",
  foreignKey: "app_users_id",
  otherKey: "post_id",
  timestamps: false,
  as: "post_retweeted"
});

// un post peut être retweet par plusieurs user
Post.belongsToMany(User, {
  through: "user_retweet_post",
  foreignKey: "post_id",
  otherKey: "app_users_id",
  timestamps: false,
  as: "post_retweeted_by"
});

//! USER COMMENT POST
// un user peut liker plusieurs posts
User.belongsToMany(Post, {
  through: "user_comments_post",
  foreignKey: "app_users_id",
  otherKey: "post_id",
  timestamps: false,
  as: "post_commented"
});

// un post peut être liké par plusieurs user
Post.belongsToMany(User, {
  through: "user_comments_post",
  foreignKey: "post_id",
  otherKey: "app_users_id",
  timestamps: false,
  as: "post_commented_by"
});









module.exports = {
  Post,
  User,
  Relationship,
  User_likes_post,
  User_comments_post,
  User_retweet_post,
  User_saved_post
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
