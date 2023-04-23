const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: "Nagapasa I",
    launchDate: new Date('December 27', '2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

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