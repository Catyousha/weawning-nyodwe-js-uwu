const express = require('express');

const app = express();
const PORT = 3000;

const friendsController = require('./controllers/friends.controller');
const messagesController = require('./controllers/messages.controller');

/// Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();

  // endpoint or another middleware logic
  next();

  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

/// GET /
app.get('/', messagesController.getMessages);

/// GET /friends
app.get('/friends', friendsController.getFriends);

/// POST /friends
app.post('/friends', friendsController.postFriend);

/// GET /friends/42
app.get('/friends/:friendId', friendsController.getFriend);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});