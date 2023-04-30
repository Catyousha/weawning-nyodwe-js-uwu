const { getAllLaunches, scheduleNewLaunch, existLaunchWithId, abortLaunchById, } = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    try {
        const result = await getAllLaunches();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }
    try {        
        await scheduleNewLaunch(launch);
        return res.status(201).json(launch);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    const isLaunchExist = await existLaunchWithId(launchId);
    if (!isLaunchExist) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = abortLaunchById(launchId);
    if(!aborted) {
        return res.status(400).json({
            error: 'Something wrong, launch not aborted',
        });
    }

    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}