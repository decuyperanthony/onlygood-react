const { Relationship } = require('../models/');

const relationshipController = {
    getAllRelationships: async (req, res) => {
        try {
             // possibilité de gerer le offset limit en envoyant un param dans l'url
             let offset = 0;
             let limit = 30;
             const relations = await Relationship.findAll({
                //  offset,
                //  limit,
                 include: [
                    "user_follower",
                    "user_followed"
                    // "user_social_network"
                 ],
                 // order: [[title, 'ASC'], [name, 'ASC']],
                //  order: [id, 'DESC'],
                 // order: [name, 'ASC'],
             });
             res.send(relations);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    getOneRelationship: async (req, res) => {
        let relationId = req.params.id;
        try {
            const relation = await Relationship.findByPk(relationId, {
                include: [
                    // "user",
                    // "user_social_network"
                ],
            });
            if (!relation) {
                return res.status(401).send('cette relation n\' existe pas');
            }
            res.send(relation);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    addRelationship: async (req, res) => {
        console.log('add relation')
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
                const newRelation = new Relationship(req.body);
                const savedRelation = await newRelation.save();
                res.status(200).send(savedRelation);
            // }

        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    // updateRelationship: async (req, res) => {
    //     let postId = req.params.id;
    //     try {
    //         const post = await Post.findByPk(postId);
    //         if (!post) {
    //             return res.status(401).send('ce post n\' existe pas');
    //         }
    //         await post.update(req.body);
    //         res.send(post);
    //     } catch (error) {
    //         console.trace(error);
    //         res.status(500).send(error);
    //     }
    // },

    removeRelationship: async (req, res, next) => {
        const relationId = req.params.id;
        try {
            let relation = await Relationship.findByPk(relationId);
            if (!relation) {
                return res.status(401).send('Cet relation n\'existe pas');
            }
            relation.destroy();
            res.status(200).send('relation supprimée');
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    }
}

module.exports = relationshipController;