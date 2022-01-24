const pool = require('../../common/services/cockroach.service').pool;

exports.findByEmail = (email) => {
    return pool.query('SELECT * FROM users WHERE email = $1', [email]);
};

exports.findById = (id) => {
    return pool.query('SELECT * FROM users WHERE id = $1', [id]);
};

exports.createUser = (userData) => {
    let age = userData.age;
    let occupation = userData.occupation;
    let longitude = userData.longitude;
    let latitude = userData.latitude;
    let name = userData.name;
    let hash = userData.hash;
    let salt = userData.salt;
    let email = userData.email;
    let permission = userData.permission;
    let priority = userData.priority;
    let vaccinated = userData.vaccinated;
    const query =   'INSERT INTO users (age, occupation, longitude, latitude, name, hash, salt, email, permission, priority, vaccinated)\
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) \
                     RETURNING id';
    const params = [age, occupation, longitude, latitude, name, hash, salt, email, permission, priority, vaccinated];

    return pool.query(query, params);
};

exports.removeById = (userId) => {
    return pool.query('DELETE FROM users WHERE id = $1', [userId]);
};

exports.vaccinateUser = (userId) => {
    return pool.query("UPDATE users SET vaccinated = true WHERE id = $1", [userId]);
};

exports.getByPriorityOrder = () => {
    return pool.query("SELECT * FROM users ORDER BY priority DESC");
};
