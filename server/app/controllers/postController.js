const { Post } = require('../models/');

const postController = {
    getAllPosts: async (req, res) => {
        try {
             // possibilité de gerer le offset limit en envoyant un param dans l'url
             let offset = 0;
             let limit = 30;
             const posts = await Post.findAll({
                //  offset,
                //  limit,
                 include: [
                    "user",
                    "post_liked_by",
                    "post_saved_by"
                    // "user_social_network"
                ],
                 // order: [[title, 'ASC'], [name, 'ASC']],
                //  order: [id, 'DESC'],
                 // order: [name, 'ASC'],
             });
             res.send(posts);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    getOnePost: async (req, res) => {
        let postId = req.params.id;
        try {
            const post = await Post.findByPk(postId, {
                include: [
                    "user",
                    "post_liked_by",
                    "post_saved_by",
                    "post_retweeted_by"
                    // "user_social_network"
                ],
            });
            if (!post) {
                return res.status(401).send('ce post n\' existe pas');
            }
            res.send(post);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    addPost: async (req, res) => {
        console.log('add post')
        try {
            console.log('req.body', req.body);
            // const { title } = req.body;
            // const findBrand = await Brand.findOne({
            //     where: {
            //         title
            //     }
            // });
            // if (findBrand) {
            //     res.send('cet marque existe déja');
            // } else {
                const newPost = new Post(req.body);
                const savedPost = await newPost.save();
                res.status(200).send(savedPost);
            // }

        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    updatePost: async (req, res) => {
        let postId = req.params.id;
        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(401).send('ce post n\' existe pas');
            }
            await post.update(req.body);
            res.send(post);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    removePost: async (req, res, next) => {
        const postId = req.params.id;
        try {
            let post = await Post.findByPk(postId);
            if (!post) {
                return res.status(401).send('Ce post n\'existe pas');
            }
            post.destroy();
            res.status(200).send('post supprimée');
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    }
}

module.exports = postController;