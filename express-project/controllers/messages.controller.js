const path = require('path');

function getMessages(req, res) {
    res.send("<h1>Helloworld</h1>");
};

function getPhoto(req, res) {
    const result = path.join(__dirname, '..', 'public', 'images', 'photo.jpg');
    res.sendFile(result);
}

module.exports = {
    getMessages,
    getPhoto,
};