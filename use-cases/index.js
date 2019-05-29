const { buildSignUpUser } = require('./sign-up-user');
const { buildEncodeUserToToken } = require('./encode-user-to-token');
const { userDb } = require('../data');

const signUpUser = buildSignUpUser({ userDataStore: userDb });
const encodeUserToToken = buildEncodeUserToToken();

module.exports = {
  signUpUser,
  encodeUserToToken,
};
