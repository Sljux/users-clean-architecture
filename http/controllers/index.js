const { signUpUser, loginUser, authorize, changeUserPassword } = require('../../use-cases');
const { buildSignUpController } = require('./sign-up');
const { buildLoginController } = require('./login');
const { buildMeController } = require('./me');
const { buildUpdatePasswordController } = require('./update-password');

const signUpController = buildSignUpController({ signUpUser });
const loginController = buildLoginController({ loginUser });
const meController = buildMeController({ authorize });
const updatePasswordController = buildUpdatePasswordController({ changeUserPassword, authorize });

module.exports = {
  signUpController,
  loginController,
  meController,
  updatePasswordController,
};
