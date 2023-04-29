const launches = new Map();
const launchesDb = require('./launches.mongo');
const planets = require('./planets.mongo');

let DEFAULT_FLIGHT_NUMBER = 100;

async function existLaunchWithId(launchId) {
    return await launchesDb.findOne({
        flightNumber: launchId,
    });
}

async function getAllLaunches() {
    return await launchesDb.find({}, {
        '_id': 0,
        '__v': 0,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDb
        .findOne({})
        .sort('-flightNumber');

    return !latestLaunch ? DEFAULT_FLIGHT_NUMBER : latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
    await launchesDb.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found ' + launch.target);
    }
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDb.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existLaunchWithId,
    abortLaunchById,
}