const { Post, User } = require('../models/');

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
                    "author",
                    "post_liked_by",
                    "post_saved_by",
                    "post_retweeted_by",
                    // "comments",
                    {
                        association: "comments",
                        include: ["author"]
                    },
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
    getUserSavedPost: async (req, res) => {
        let userId = req.params.id;

        try {
            let postSavedData= [];
            const user = await User.findByPk(userId, {
                include:[
                    "post_saved",
                ]
            });
            // console.log('user.dataValues', user.dataValues.post_saved);
            const postSaved = await user.dataValues.post_saved;
            for (p of postSaved) {
                console.log('p.dataValues.id', p.dataValues.id);
                await Post.findByPk(p.dataValues.id, {
                        include: [
                            "author",
                            "post_liked_by",
                            "post_saved_by",
                            "post_retweeted_by",
                            // "comments",
                            {
                                association: "comments",
                                include: ["author"]
                            },
                        ],
                        })
                            .then((res) => {
                                postSavedData.push(res.dataValues)
                                console.log('res', res)
                            })
                            .catch((err) => console.trace(err))
            }

            await res.send(postSavedData);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    getUserPost: async (req, res) => {
        let userId = req.params.id;
        try {
            let postData= [];
            const user = await User.findByPk(userId, {
                include:[
                    "posts",
                ]
            });
            console.log('user.dataValues.posts', user.dataValues.posts)
            const postUser = await user.dataValues.posts;
            for (p of postUser) {
                await Post.findByPk(p.dataValues.id, {
                    include: [
                        "author",
                        "post_liked_by",
                        "post_saved_by",
                        "post_retweeted_by",
                        // "comments",
                        {
                            association: "comments",
                            include: ["author"]
                        },
                    ],
                    })
                        .then((res) => {
                            postData.push(res.dataValues)
                            console.log('res', res)
                        })
                        .catch((err) => console.trace(err))
            }
            res.send(postData)
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    getUserLikedPost: async (req, res) => {
        let userId = req.params.id;
        try {
            let postLikedData= [];
            const user = await User.findByPk(userId, {
                include:[
                    "post_liked",
                ]
            });
            // console.log('user.dataValues', user.dataValues.post_saved);
            const postLiked = await user.dataValues.post_liked;
            for (p of postLiked) {
                console.log('p.dataValues.id', p.dataValues.id);
                await Post.findByPk(p.dataValues.id, {
                        include: [
                            "author",
                            "post_liked_by",
                            "post_saved_by",
                            "post_retweeted_by",
                            // "comments",
                            {
                                association: "comments",
                                include: ["author"]
                            },
                        ],
                        })
                            .then((res) => {
                                postLikedData.push(res.dataValues)
                                console.log('res', res)
                            })
                            .catch((err) => console.trace(err))
            }

            await res.send(postLikedData);
            // await res.send(postSavedData);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    //! à refaire
    getUserCommentedPost: async (req, res) => {
        let userId = req.params.id;
        try {
            let postCommentedData = [];
            const user = await User.findByPk(userId, {
                include:[
                    "post_commented",
                ]
            });
            console.log('user.dataValues', user.dataValues.post_commented);
            const postLiked = await user.dataValues.post_commented;
            for (p of postLiked) {
                console.log('p.dataValues.id', p.dataValues.id);
                await Post.findByPk(p.dataValues.id, {
                        include: [
                            "author",
                            "post_liked_by",
                            "post_saved_by",
                            "post_retweeted_by",
                            // "comments",
                            {
                                association: "comments",
                                include: ["author"]
                            },
                        ],
                        })
                            .then((res) => {
                                postCommentedData.push(res.dataValues)
                                console.log('res', res)
                            })
                            .catch((err) => console.trace(err))
            }

            await res.send(postCommentedData);
            // await res.send(postSavedData);
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
                    "author",
                    "post_liked_by",
                    "post_saved_by",
                    "post_retweeted_by",
                    // "comments",
                    {
                        association: "comments",
                        include: ["author"]
                    },
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