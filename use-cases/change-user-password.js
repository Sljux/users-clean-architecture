const { makeUser } = require('../user');

module.exports.buildChangeUserPassword = function buildChangeUserPassword({ userDataStore }) {
  return async function changeUserPassword(userData) {
    const user = await makeUser(userData);

    return userDataStore.updatePassword({ username: user.username, password: await user.hashedPassword() });
  };
};
