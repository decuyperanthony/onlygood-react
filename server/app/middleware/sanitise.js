const sanitizer = require('sanitizer');

module.exports = (req, res, next) => {
    // Pour chaque propriété de req.body
    for (let prop in req.body) {
        // Je l'assainit !
        // notation braquette
        req.body[prop] = sanitizer.escape(req.body[prop]);
    }
    // et c'est tout !
    next();

};