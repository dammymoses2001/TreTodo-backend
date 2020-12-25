const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECERTKEY);
        req.user = user;
        next();
    } else {
        return res.status(400).json({
            message: 'Authorization Required',
        });
    }

};
