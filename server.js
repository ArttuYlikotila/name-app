'use strict'
const express = require('express');

const app = express();
const port = 8000;
const api = require('./routes/router');

app.use('/api/', api);

app.listen(port, () => console.log(`Listening to port ${port}`));