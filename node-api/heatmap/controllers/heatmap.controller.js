const HeatModel = require('../models/heatmap.model');
const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');

exports.getData = (req, res) => {
    HeatModel.getAllCoords()
        .then((results) => {
            res.status(200).send(results.rows);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

exports.getEligible = (req, res) => {
    HeatModel.getEligible(req.body.priority, req.body.occupations)
        .then((results) => {
            res.status(200).send(results.rows);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

var sampleUser = {
    name: "Testing Data",
    occupation: "None",
    permission: 1,
    vaccinated: false
}

const waterlooLat = 43.47211;
const waterlooLon = -80.54491;
const maxInterHotSpotVariance = 0.08;
const maxIntraHotSpotVariance = 0.01;

function randomEmail(length) {
    var email = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        email += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return email + "@gmail.com";
}

function getOffset(max) {
    let neg = Math.random();
    let offset = Math.pow(Math.random(), 3) * max;
    if(neg > 0.5) {
        return offset;
    }
    return -offset;
}

function randomAngle() {
    return Math.random() * 2 * Math.PI;
}

exports.generateData = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    sampleUser.salt = salt;
    let hash = crypto.createHmac('sha512', salt).update("passw0rd").digest("base64");
    sampleUser.hash = hash;
 
    for (i = 0; i < req.params.quantity; i++) {
        let hotSpotOffset = getOffset(maxInterHotSpotVariance);
        let angle = randomAngle();
        var hotSpotLat = waterlooLat + (hotSpotOffset * Math.cos(angle));
        var hotSpotLon = waterlooLon + (hotSpotOffset * Math.sin(angle));

        let points = 500;
        if(req.params.quantity - i < 500) {
            points = req.params.quantity - i;
        }
        for(j = 0; j < points; j++) {
            sampleUser.age = Math.floor(Math.random() * 80);
            sampleUser.email = randomEmail(Math.random() * 20);
            hotSpotOffset = getOffset(maxIntraHotSpotVariance);
            angle = randomAngle();
            sampleUser.latitude = hotSpotLat + (hotSpotOffset * Math.cos(angle));
            sampleUser.longitude = hotSpotLon + (hotSpotOffset * Math.sin(angle));
            sampleUser.priority = sampleUser.age / 10;
            
            UserModel.createUser(sampleUser)
                .then((result) => {
                    
                })
                .catch((err) => {
                });

        }
        i += points;
    }
    res.status(201).send();
};