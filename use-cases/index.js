const { buildSignUpUser } = require('./sign-up-user');
const { buildEncodeUserToToken } = require('./encode-user-to-token');
const { buildLoginUser } = require('./login-user');

const { userDb } = require('../data');

const encodeUserToToken = buildEncodeUserToToken();
const signUpUser = buildSignUpUser({ userDataStore: userDb, encodeUserToToken });
const loginUser = buildLoginUser({ userDataStore: userDb, encodeUserToToken });

module.exports = {
  signUpUser,
  encodeUserToToken,
  loginUser,
};
