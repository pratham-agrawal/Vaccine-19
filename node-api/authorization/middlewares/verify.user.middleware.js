const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((result)=>{
            if (!result.rows[0]){
                res.status(404).send({});
            }else{
                user = result.rows[0];
                let salt = user.salt;
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === user.hash) {
                    req.body = {
                        userId: user.id,
                        email: user.email,
                        provider: 'email',
                        name: user.name,
                        permission: user.permission,
                        age: user.age,
                        priority: user.priority,
                        occupation: user.occupation,
                        longitude: user.longitude,
                        latitude: user.latitude
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};