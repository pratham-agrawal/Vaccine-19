module.exports = {
    "port": 3600,
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "sushilagrawal",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "ADMIN": 2
    },
    "dbConn":"mongodb+srv://rayhaan:passw0rd@htn.aeflv.mongodb.net/HTN?retryWrites=true&w=majority"
};
