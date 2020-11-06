// imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = process.env.SECRET_SIGN_TOKEN;
const JWT_SHORT_SIGN_SECRET = process.env.SECRET_SIGN_TOKEN_SHORT;

// export
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            role: userData.role
            // mettre le rôle à terme
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '3h'
        })
    },

    generateShortTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            role: userData.role
            // mettre le rôle à terme
        },
        JWT_SHORT_SIGN_SECRET,
        {
            // expiresIn: '1h'
            expiresIn: 60*10
        })
    },

    verifyToken: function(token) {
        return jwt.verify(token, JWT_SIGN_SECRET);
    },

    verifyShortToken: function(token) {
        return jwt.verify(token, JWT_SHORT_SIGN_SECRET);
    }
}