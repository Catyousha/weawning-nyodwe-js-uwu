const { launches } = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
    httpGetAllLaunches,
}