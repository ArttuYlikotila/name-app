'use strict'
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;
const api = require('./routes/router');

app.use('/api/', api);

if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '/client/public')));
}
else {
  app.use(express.static(path.join(__dirname, '/client/build')));
}

app.listen(port, () => console.log(`Listening to port ${port}`));