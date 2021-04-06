const express = require('express');
const redis = require('redis');
const session = require('express-session');

const app = express();

const { handleError, logError } = require('./utils/error.utils');

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient('redis://redis:6379');

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    resave: false,
  })
);

// JSON parsing middleware
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

app.use('/api/videos', require('./routes/video.routes'));

app.use(logError);
app.use(handleError);

module.exports = app;
