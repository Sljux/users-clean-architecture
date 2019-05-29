const { signUpUser } = require('../../use-cases');
const { buildSignUpController } = require('./sign-up');

const signUpController = buildSignUpController({ signUpUser });

module.exports = {
  signUpController,
};
