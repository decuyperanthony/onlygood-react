const { Post, User, User_likes_post, User_comments_post } = require('../models/');
const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');

const postController = {
    getAllPosts: async (req, res) => {
        try {
             // possibilité de gerer le offset limit en envoyant un param dans l'url
             let offset = 0;
             let limit = 5;
             const posts = await Post.findAll({
                order: [
                    ['id', 'DESC'],
                 ],
                 limit,
                 offset,
                // limit,
                //  order: ['DESC', 'content'],
                 limit,
                 include: [
                    "author",
                    // "post_liked_by",
                    // "post_saved_by",
                    // "post_retweeted_by",
                    "likes",
                    "saved",
                    "retweets",
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
                // console.log('p.dataValues.id', p.dataValues.id);
                await Post.findByPk(p.dataValues.id, {
                        include: [
                            "author",
                            // "post_liked_by",
                            // "post_saved_by",
                            // "post_retweeted_by",
                            "likes",
                            "saved",
                            "retweets",
                            // "comments",
                            {
                                association: "comments",
                                include: ["author"]
                            },
                        ],
                        })
                            .then((res) => {
                                postSavedData.push(res.dataValues)
                                // console.log('res', res)
                            })
                            .catch((err) => console.trace(err))
            }

            await res.send(postSavedData);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    // getUserPost: async (req, res) => {
    //     let userId = req.params.id;
    //     try {
    //         let postData= [];
    //         const user = await User.findByPk(userId, {
    //             // order: [
    //             //     ['id', 'DESC'],
    //             //  ],
    //             include:[
    //                 "posts",
    //                 // order: [
    //                 //     ['id', 'DESC'],
    //                 //  ],
    //             ]
    //         });
    //         // console.log('user.dataValues.posts', user.dataValues.posts)
    //         const postUser = await user.dataValues.posts;
    //         // let i = 0;
    //         for (p of postUser) {

    //             // while (i < 4) {
    //             //     i++;
    //                 await Post.findByPk(p.dataValues.id, {
    //                     include: [
    //                         "author",
    //                         "post_liked_by",
    //                         "post_saved_by",
    //                         "post_retweeted_by",
    //                         // "comments",
    //                         {
    //                             association: "comments",
    //                             include: ["author"]
    //                         },
    //                     ],
    //                     })
    //                         .then((res) => {
    //                             postData.push(res.dataValues)
    //                             // console.log('res', res)
    //                         })
    //                         .catch((err) => console.trace(err))
    //             // }
    //         }
    //         res.send(postData)
    //     } catch (error) {
    //         console.trace(error);
    //         res.status(500).send(error);
    //     }
    // },

    getPostByUserId: async (req, res) => {
        let userId = req.params.id;
        try {
            let limit = 5;
            const posts = await Post.findAll({
                where: {
                    app_users_id: userId
                },
                order: [
                    ['id', 'DESC'],
                ],
                // limit,
                //  order: ['DESC', 'content'],
                 limit,
                 include: [
                    "author",
                    // "post_liked_by",
                    // "post_saved_by",
                    // "post_retweeted_by",
                    "likes",
                    "saved",
                    "retweets",
                    // "comments",
                    {
                        association: "comments",
                        include: ["author"]
                    },
                ],
            })
            // let postData= [];
            // const user = await User.findByPk(userId, {
            //     // order: [
            //     //     ['id', 'DESC'],
            //     //  ],
            //     include:[
            //         "posts",
            //         // order: [
            //         //     ['id', 'DESC'],
            //         //  ],
            //     ]
            // });
            // // console.log('user.dataValues.posts', user.dataValues.posts)
            // const postUser = await user.dataValues.posts;
            // // let i = 0;
            // for (p of postUser) {

            //     // while (i < 4) {
            //     //     i++;
            //         await Post.findByPk(p.dataValues.id, {
            //             include: [
            //                 "author",
            //                 "post_liked_by",
            //                 "post_saved_by",
            //                 "post_retweeted_by",
            //                 // "comments",
            //                 {
            //                     association: "comments",
            //                     include: ["author"]
            //                 },
            //             ],
            //             })
            //                 .then((res) => {
            //                     postData.push(res.dataValues)
            //                     // console.log('res', res)
            //                 })
            //                 .catch((err) => console.trace(err))
            //     // }
            // }
            res.send(posts)
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    getPostByUserIdAndCount: async (req, res) => {
        let userId = req.params.id;
        try {
            let limit = 5;
            // Model.findAll({
            //     attributes: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
            //   });

            const posts = await Post.findAll({
                where: {
                    app_users_id: userId
                },
                order: [
                    ['id', 'DESC'],
                ],
                 limit,
                //  include: [
                //     { model: User_likes_post}
                //  ],
                //  User_likes_post
                 include: [
                    "author",
                    "likes",
                    "saved",
                    "retweets",
                    // "post_liked_by",
                    // "post_saved_by",
                    // "post_retweeted_by",
                    "comments",
                    {
                        association: "comments",
                        include: ["author",]
                    },
                ],
            });

            // const comments = User_comments_post.findAll({
            //     attributes: [
            //         [Sequelize.fn('COUNT', Sequelize.col('app_users_id')), 'comments']
            //     ]
            // })

            // User.findAll({
            //     include: {
            //       model: Task,
            //       required: true
            //     }
            //   });

            //   const posts = await Post.findAll({
            //       include: {
            //           model: "post"
            //       }
            //   })

            // const numberOfLikes = await User_likes_post.findAll({
            //     where: {
            //         post_id: userId
            //     }
            // })

            res.send(posts)
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
                            // "post_liked_by",
                            // "post_saved_by",
                            // "post_retweeted_by",
                            "likes",
                            "saved",
                            "retweets",
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
                            // "post_liked_by",
                            // "post_saved_by",
                            // "post_retweeted_by",
                            "likes",
                            "saved",
                            "retweets",
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
                    // "post_liked_by",
                    // "post_saved_by",
                    // "post_retweeted_by",
                    "likes",
                    "saved",
                    "retweets",
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
        // let userId = req.params.userId;
        try {
            console.log('req.body', req.body);
            console.log('req.file', req.file);
            const user = await User.findByPk(req.body.app_users_id);
            if (!user) {
                console.log('ici')
                return res.status(401).send('cet utilisateur n\' existe pas');
            }
            if (req.file) {
                console.log('req.file.path', req.file.path)
                console.log('req.file.path.substring(14).replace(/\s/g, '-')', req.file.path.substring(14).replace(/\s/g, '-'))
                req.body.picture = req.file.path.substring(11).replace(/\s/g, '-');
            }
                const newPost = new Post(req.body);
                const savedPost = await newPost.save();
                res.status(200).send(savedPost);
                // res.send('ok')
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
            if (post.picture) {
                fs.unlink(`${path.join(__dirname, '../../../server/public/img/') + post.dataValues.picture}`, error => {
                    console.log('error in fs unlink', error)
                });
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