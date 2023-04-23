const { getAllLaunches } = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

module.exports = {
    httpGetAllLaunches,
}