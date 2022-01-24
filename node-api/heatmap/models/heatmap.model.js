const pool = require('../../common/services/cockroach.service').pool;

exports.getAllCoords = () => {
    return pool.query('SELECT longitude, latitude, priority FROM users WHERE vaccinated = false');
};

exports.getEligible = (minPriority, occupations) => {
    let query = `SELECT longitude, latitude, priority FROM users WHERE priority >= ${minPriority}`;
    occupations.forEach(element => {
        query += ` OR occupation = '${element}'`;
    });

    return pool.query(query);
};