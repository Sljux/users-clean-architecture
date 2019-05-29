const { makeUser } = require('../user');

module.exports.buildSignUpUser = function ({ userDataStore }) {
  return async function signUpUser(userData) {
    const user = await makeUser(userData);

    const existing = await userDataStore.findByUsername(user.username);

    if (existing) {
      throw new Error('User with that username already exists');
    }

    return userDataStore.insert({
      username: user.username,
      password: user.password,
    });
  }
};
