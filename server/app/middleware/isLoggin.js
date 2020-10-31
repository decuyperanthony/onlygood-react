const isLoggin = (req, res, next) => {
    // est ce que je suis loggin ou non
    if (req.session.user) {
        next();
    } else {
        res.redirect('login');
    }

};

module.exports = isLoggin;