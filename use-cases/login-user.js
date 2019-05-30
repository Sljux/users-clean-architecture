const { makeUser } = require('../user');

module.exports.buildLoginUser = function buildLoginUser({ userDataStore, encodeUserToToken }) {
  return async function loginUser(userData) {
    const user = await makeUser(userData);

    const userFromDb = await userDataStore.findByUsername(user.username);

    if (!userFromDb) {
      throwNotFound();
    }

    const passwordsMatch = await user.comparePassword(userFromDb.password);

    if (!passwordsMatch) {
      throwNotFound();
    }

    return encodeUserToToken(user);
  }
};

function throwNotFound() {
  throw new Error('Username or password not valid');
}
