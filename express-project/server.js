const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

/// Views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use('/site', express.static(path.join(__dirname, 'public')));

/// Middleware to process request and response before get into endpoint
// Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();

  // endpoint or another middleware logic
  next();

  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

// Json-Parser Middleware
app.use(express.json());

/// Router to group request path
const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

app.get("/", (req, res) => {
  res.render('index', {
    title: "Ini Title",
    headline: "Helloworld",
    caption: "yahaha wahyuu"
  });
});
app.use("/messages", messagesRouter);
app.use("/friends", friendsRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
