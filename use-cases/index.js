const { buildSignUpUser } = require('./sign-up-user');
const { buildEncodeUserToToken } = require('./encode-user-to-token');
const { buildLoginUser } = require('./login-user');
const { buildAuthorize } = require('./authorize');

const { userDb } = require('../data');

const encodeUserToToken = buildEncodeUserToToken();
const signUpUser = buildSignUpUser({ userDataStore: userDb, encodeUserToToken });
const loginUser = buildLoginUser({ userDataStore: userDb, encodeUserToToken });
const authorize = buildAuthorize();

module.exports = {
  signUpUser,
  encodeUserToToken,
  loginUser,
  authorize,
};
