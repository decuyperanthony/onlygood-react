const { User_likes_post } = require('../models');

const impressionController = {

    addOrRemoveLikeToPost: async (req, res) => {
        console.log('add like');
        try {
            console.log('req.body', req.body);
            // const app_users_id = req.body.app_users_id;
            //! on check si la relation existe
            const like = await User_likes_post.findOne({
                where: {
                    app_users_id: req.body.app_users_id,
                    post_id: req.body.post_id
                }
            });

            if (like) {
                //si la relation existe on supprime
                // console.log('ok il a deja like il faut supprimer');
                like.destroy();
                res.status(200).send('relation user likes post supprimée');
            } else {
                // si elle n'existe pas on la crée
                // console.log('il a jamais liké ce post alors on ajoute la ligne');
                const newLike = new User_likes_post(req.body);
                const savedLike = await newLike.save();
                res.status(200).send(savedLike);
            }

        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },


}

module.exports = impressionController;