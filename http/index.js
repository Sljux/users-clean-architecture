const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { signUpController, loginController, meController, updatePasswordController } = require('./controllers');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.post('/signup', signUpController);
app.post('/login', loginController);
app.get('/me', meController);
app.put('/me/update-password', updatePasswordController);

module.exports = app;
