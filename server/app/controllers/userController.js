const User = require("../models/user");

const userController = {
  getAllUsers: async (req, res) => {
    try {
         const users = await User.findAll({
            // order: [lastname, 'ASC'],
            include: [
              "posts",
              {
                  association: "follower",
                  include: ["user_followed"]
              },
              {
                  association: "followed",
                  include: ["user_follower"]
              },
              "post_saved",
              "post_liked",
              "post_commented",
              "post_retweeted"
              // "author"
            ],
            // include: [
            //   "follower",
            //   "followed",
            //   "posts"
            // ],
            order: [
                ['id', 'ASC'],
             ]
         });
         res.send(users);
    } catch (error) {
        console.trace(error);
        res.status(500).send(error);
    }
  },
  getOneUser: async (req, res) => {
    let userId = req.params.id;
    try {
        const user = await User.findByPk(userId, {
          include: [
            "posts",
            {
                association: "follower",
                include: ["user_followed"]
            },
            {
                association: "followed",
                include: ["user_follower"]
            },
            // "author"
          ],
        });
        if (!user) {
            return res.status(401).send('cet utilisateur n\' existe pas')
        }
        res.send(user);
    } catch (error) {
        console.trace(error);
        res.status(500).send(error);
    }
  },
  // updateUser: async (req, res, next) => {
  //     try {
  //         // const userId = req.params.id;
  //         const user = await User.findByPk(req.session.user.id);
  //         if (!user) {
  //             return next();
  //         }
  //         await user.update(req.body);
  //     } catch (error) {
  //         console.trace(error);
  //         res.status(500).send(error);
  //     }
  // }
  updateUser: async (req, res) => {
    let userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).send('cet utilisateur n\' existe pas');
        }
        await user.update(req.body);
        res.send(user);
    } catch (error) {
        console.trace(error);
        res.status(500).send(error);
    }
},
};

module.exports = userController;