const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config')['jwt_secret'];

const ADMIN_PERMISSION = require('../config/env.config').permissionLevels.ADMIN;

exports.requirePermissionLevel = (requiredLevel) => {
    return (req, res, next) => {
        let userPermission = parseInt(req.jwt.permission);
        if (userPermission >= requiredLevel) {
            return next();
        } else {
            return res.status(403).send({errors: "Not enough permissions"});
        }
    };
};

exports.requireSameUser = (req, res, next) => {
    let userPermission = parseInt(req.jwt.permission);
    let userId = req.jwt.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    } else {
        if (userPermission >= ADMIN_PERMISSION) {
            return next();
        } else {
            return res.status(403).send({errors: "Not same user and not admin"});
        }
    }
};