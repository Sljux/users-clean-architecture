const { makeUser } = require('../user');

module.exports.buildSignUpUser = function buildSignUpUser({ userDataStore, encodeUserToToken }) {
  return async function signUpUser(userData) {
    const user = await makeUser(userData);

    const existing = await userDataStore.findByUsername(user.username);

    if (existing) {
      throw new Error('User with that username already exists');
    }

    const insertPromise = userDataStore.insert({
      username: user.username,
      password: await user.hashedPassword(),
    });

    const tokenPromise = encodeUserToToken(user);

    const [_, token] = await Promise.all([insertPromise, tokenPromise]);

    return token;
  }
};
