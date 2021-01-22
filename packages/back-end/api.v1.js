const express = require('express');
const users = require('./endpoints/users');

const app = express();

app.use('/users', users);

module.exports = app;
