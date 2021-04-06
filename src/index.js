const express = require('express');
const app = express();

const { handleError, logError } = require('./utils/error.utils');

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
