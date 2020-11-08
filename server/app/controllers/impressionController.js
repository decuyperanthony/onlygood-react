const { User_likes_post } = require('../models');
const { User_saved_post } = require('../models');
const { User_retweet_post } = require('../models');

const impressionController = {
    //* ----------- LIKES -------------
    addOrRemoveLikeToPost: async (req, res) => {
        // console.log('add like');
        try {
            // console.log('req.body', req.body);
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
    //* ----------- SAVED -------------
    addOrRemoveSaveToPost: async (req, res) => {
        // console.log('add like');
        try {
            // console.log('req.body', req.body);
            // const app_users_id = req.body.app_users_id;
            //! on check si la relation existe
            const save = await User_saved_post.findOne({
                where: {
                    app_users_id: req.body.app_users_id,
                    post_id: req.body.post_id
                }
            });

            if (save) {
                //si la relation existe on supprime
                // console.log('ok il a deja like il faut supprimer');
                save.destroy();
                res.status(200).send('relation user save post supprimée');
            } else {
                // si elle n'existe pas on la crée
                // console.log('il a jamais liké ce post alors on ajoute la ligne');
                const newSave = new User_saved_post(req.body);
                const savedSave = await newSave.save();
                res.status(200).send(savedSave);
            }

        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    //* ----------- SAVED -------------
    addOrRemoveRetweetToPost: async (req, res) => {
        // console.log('add like');
        try {
            // console.log('req.body', req.body);
            // const app_users_id = req.body.app_users_id;
            //! on check si la relation existe
            const retweet = await User_retweet_post.findOne({
                where: {
                    app_users_id: req.body.app_users_id,
                    post_id: req.body.post_id
                }
            });

            if (retweet) {
                //si la relation existe on supprime
                // console.log('ok il a deja like il faut supprimer');
                retweet.destroy();
                res.status(200).send('relation user retweet post supprimée');
            } else {
                // si elle n'existe pas on la crée
                // console.log('il a jamais liké ce post alors on ajoute la ligne');
                const newRetweet = new User_retweet_post(req.body);
                const savedRetweet = await newRetweet.save();
                res.status(200).send(savedRetweet);
            }

        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },


}

module.exports = impressionController;