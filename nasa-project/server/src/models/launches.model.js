const launches = new Map();

let latestFlightNumber = 100;

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;

    // Object.assign == .copyWith
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ["Abyssal", "Scepter"],
        upcoming: true,
        success: true,
    }));
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}