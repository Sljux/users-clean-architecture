const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { signUpController } = require('./controllers');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.post('/signup', signUpController);

module.exports = app;
