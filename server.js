require('dotenv').config();
const app = require('./src');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Service started at: http://0.0.0.0:${PORT}`)
);
