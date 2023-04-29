const request = require('supertest');
const app = require('../../app');
const {
    mongoConnect,
    mongoDisconnect,
} = require('../../services/mongo');
const {
    loadPlanetsData,
} = require('../../models/planets.model');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsData();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });


    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launches', () => {
        const completeLaunchData = {
            mission: "IDN145",
            rocket: "Kerisbuana IDN1",
            target: "Kepler-1652 b",
            launchDate: "August 17, 2045"
        };

        const launchDataWithUnknownPlanet = {
            mission: "IDN145",
            rocket: "Kerisbuana IDN1",
            target: "Ke",
            launchDate: "August 17, 2045"
        };

        const launchDataWithInvalidDate = {
            mission: "IDN145",
            rocket: "Kerisbuana IDN1",
            target: "Kepler-1652 b",
            launchDate: "hello"
        };

        const launchDataWithoutDate = {
            mission: "IDN145",
            rocket: "Kerisbuana IDN1",
            target: "Kepler-1652 b"
        };

        test('It should respond with 201 success', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();

            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });

        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch property',
            });
        });

        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });

        test('It should catch no matching planet found', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithUnknownPlanet)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'No matching planet found',
            });
        })
    });
});