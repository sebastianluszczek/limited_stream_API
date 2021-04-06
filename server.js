const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    msg: 'success',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Service started at: http://0.0.0.0:${PORT}`)
);
