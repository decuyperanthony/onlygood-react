const User = require("../models/user");
const fs = require('fs');
const path = require('path');
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
            //   "post_saved",
            //   "post_liked",
            //   "post_commented",
            //   "post_retweeted"
              // "author"
            ],
            order: [
                ['id', 'DESC'],
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
            // "posts",
            {
                association: "posts",
                include: [
                    "author",
                    "post_liked_by",
                    "post_saved_by",
                    "post_retweeted_by",
                {
                    association: "comments",
                    include: ["author"]
                },
                ],
            },
            {
                association: "follower",
                include: ["user_followed"]
            },
            {
                association: "followed",
                include: ["user_follower"]
            },
            // {
            //     association: "post_saved",
            //     include: ["author",
            //     "post_liked_by",
            //     "post_saved_by",
            //     "post_retweeted_by"]
            // },
            "post_saved",
            // {
            //     association: "post_liked",
            //     include: ["author",
            //     "post_liked_by",
            //     "post_saved_by",
            //     "post_retweeted_by"]
            // },
            "post_liked",
            "post_commented",
            "post_retweeted"
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
    console.log('updateUser --------------------------')
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).send('cet utilisateur n\' existe pas');
        }
        if (req.file) {
            console.log('req.file.path.substring(14).replace(/\s/g, '-')', req.file.path.substring(14).replace(/\s/g, '-'))
            req.body.picture_road = req.file.path.substring(11).replace(/\s/g, '-');
            //! maintenant on supprimer l'ancienne photo si il y en avait une
            if (user.dataValues.picture_road) {
                console.log('user.dataValues.picture_road', user.dataValues.picture_road);
                fs.unlink(`${path.join(__dirname, '../../../server/public/img/') + user.dataValues.picture_road}`, error => {
                    console.log('error in fs unlink', error)
                });
            }
        }

        await user.update(req.body);
        res.send(user);
    } catch (error) {
        console.trace(error);
        res.status(500).send(error);
    }
  },
  updatePictureHeader: async (req, res) => {
    let userId = req.params.id;
    console.log('updatePictureHeader --------------------------')
    try {
        let myObject = {}
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(401).send('cet utilisateur n\' existe pas');
        }
        if (req.file) {
            console.log('req.file.path.substring(11).replace(/\s/g, '-')', req.file.path.substring(11).replace(/\s/g, '-'))
            myObject.picture_header = req.file.path.substring(11).replace(/\s/g, '-');
            //! maintenant on supprimer l'ancienne photo si il y en avait une
            if (user.dataValues.picture_header && user.dataValues.picture_header !== 'avatar_header.png') {
                console.log('user.dataValues.picture_header', user.dataValues.picture_header);
                fs.unlink(`${path.join(__dirname, '../../../server/public/img/') + user.dataValues.picture_header}`, error => {
                    console.log('error in fs unlink', error)
                });
            }
        }

        await user.update(myObject);
        res.send(user);
    } catch (error) {
        console.trace(error);
        res.status(500).send(error);
    }
  },
};

module.exports = userController;