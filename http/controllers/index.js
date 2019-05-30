const { signUpUser, loginUser } = require('../../use-cases');
const { buildSignUpController } = require('./sign-up');
const { buildLoginController } = require('./login');

const signUpController = buildSignUpController({ signUpUser });
const loginController = buildLoginController({ loginUser });

module.exports = {
  signUpController,
  loginController,
};
