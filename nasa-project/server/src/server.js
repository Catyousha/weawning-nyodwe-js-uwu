const dotenv = require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection has been established.');
})
mongoose.connection.on('error', (err) => {
    console.log(err);
})

async function startServer() {
    await mongoose.connect(process.env.MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`);
    });
}

startServer();