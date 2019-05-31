const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const {
  signUpController,
  loginController,
  meController,
  updatePasswordController,
  likeUserController,
  unlikeUserController,
} = require('./controllers');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.post('/signup', signUpController);
app.post('/login', loginController);
app.get('/me', meController);
app.put('/me/update-password', updatePasswordController);
app.post('/user/:id/like', likeUserController);
app.delete('/user/:id/unlike', unlikeUserController);

module.exports = app;
