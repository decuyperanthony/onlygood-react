const User = require("../models/user");

const userController = {
  getAllUsers: async (req, res) => {
    try {
         const users = await User.findAll({
            // order: [lastname, 'ASC'],
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
        const user = await User.findByPk(userId);
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
    try {
      // on recup le user en session donc le user logué
      let userToUpdate = req.session.user.id;
      let user = await User.findByPk(userToUpdate);
      console.log("user", user);
      console.log("req.body", req.body);
      //   if (!req.body.newRole === "" || !req.body.newRoadPicture === "") {}
      const newRoadPicture = req.body.newRoadPicture;
      const newRole = req.body.newRole;
      user.role = newRole;
      user.picture_road = newRoadPicture;
      user.save();

      res.redirect("/userPage");
    } catch (error) {
      console.trace(error);
    }
  }
};

module.exports = userController;