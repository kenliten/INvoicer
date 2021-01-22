const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const logger = require('morgan');

const api = {
  v1: require('./api.v1')
};

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(jwt);

app.use('/api/v1/', api.v1);

module.exports = app;
