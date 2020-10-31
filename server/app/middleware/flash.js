module.exports = (req, res, next) => {
    // session flash pour le post des messages

    if (req.session.flash) {
        res.locals.flash = req.session.flash;
        req.session.flash = undefined
    }
    req.flash = (type, content) => {
        if (req.session.flash === undefined) {
            req.session.flash = {}
        }
        req.session.flash[type] = content
    }
    next()
};