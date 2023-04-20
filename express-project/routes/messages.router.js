const express = require('express');

const messagesController = require('../controllers/messages.controller');

const messagesRouter = express.Router();
messagesRouter.get('/', messagesController.getMessages);
messagesRouter.get('/photo', messagesController.getPhoto);

module.exports = messagesRouter;