const { signUpUser, loginUser, authorize, changeUserPassword, likeUser, unlikeUser } = require('../../use-cases');
const { buildSignUpController } = require('./sign-up');
const { buildLoginController } = require('./login');
const { buildMeController } = require('./me');
const { buildUpdatePasswordController } = require('./update-password');
const { buildLikeUserController } = require('./like-user');
const { buildUnlikeUserController } = require('./unlike-user');

const signUpController = buildSignUpController({ signUpUser });
const loginController = buildLoginController({ loginUser });
const meController = buildMeController({ authorize });
const updatePasswordController = buildUpdatePasswordController({ changeUserPassword, authorize });
const likeUserController = buildLikeUserController({ likeUser, authorize });
const unlikeUserController = buildUnlikeUserController({ unlikeUser, authorize });

module.exports = {
  signUpController,
  loginController,
  meController,
  updatePasswordController,
  likeUserController,
  unlikeUserController,
};
