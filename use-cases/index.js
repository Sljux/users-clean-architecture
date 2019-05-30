const { buildSignUpUser } = require('./sign-up-user');
const { buildEncodeUserToToken } = require('./encode-user-to-token');
const { buildLoginUser } = require('./login-user');
const { buildAuthorize } = require('./authorize');
const { buildChangeUserPassword } = require('./change-user-password');

const { userDb } = require('../data');

const encodeUserToToken = buildEncodeUserToToken();
const signUpUser = buildSignUpUser({ userDataStore: userDb, encodeUserToToken });
const loginUser = buildLoginUser({ userDataStore: userDb, encodeUserToToken });
const authorize = buildAuthorize();
const changeUserPassword = buildChangeUserPassword({ userDataStore: userDb });

module.exports = {
  signUpUser,
  encodeUserToToken,
  loginUser,
  authorize,
  changeUserPassword,
};
