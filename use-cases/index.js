const { buildSignUpUser } = require('./sign-up-user');
const { userDb } = require('../data');

const signUpUser = buildSignUpUser({ userDataStore: userDb });

module.exports = {
  signUpUser,
};
