const { verify } = require("jsonwebtoken");

module.exports = {
    authToken: (req, res, next) => {
        let token = req.headers.authorization;
        if (token) {
            token = token.slice(7);
            verify(token, "accessTokenSecret", (error, decoded) => {
                if (error) {
                    res.json({ status: false, message: "Token is invalid" });
                } else {
                    next();
                }
            })
        }
        else {
            res.json({ status: false, message: "Bearer Token is empty" });
        }
    },

    loginExpire: async (req, res, next) => {
        session = await req.session.userId;

        if (session) {
            next();
        }
        else {
            next();
            // res.redirect('/');
        }
    }
}