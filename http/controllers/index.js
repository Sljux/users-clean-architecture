const { signUpUser, encodeUserToToken } = require('../../use-cases');
const { buildSignUpController } = require('./sign-up');

const signUpController = buildSignUpController({ signUpUser, encodeUserToToken });

module.exports = {
  signUpController,
};
