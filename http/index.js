const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { signUpController, loginController } = require('./controllers');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.post('/signup', signUpController);
app.post('/login', loginController);

module.exports = app;
