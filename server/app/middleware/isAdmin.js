const isAdmin = (req, res, next) => {
    // est ce que je suis admin ou non
    console.log(req.session.user);
    if (req.session.user.role === 'admin') {
        next();
    } else {
        res.status(401).render('401');
    }

};

module.exports = isAdmin;