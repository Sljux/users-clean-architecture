const { signUpUser, loginUser, authorize } = require('../../use-cases');
const { buildSignUpController } = require('./sign-up');
const { buildLoginController } = require('./login');
const { buildMeController } = require('./me');

const signUpController = buildSignUpController({ signUpUser });
const loginController = buildLoginController({ loginUser });
const meController = buildMeController({ authorize });

module.exports = {
  signUpController,
  loginController,
  meController,
};
