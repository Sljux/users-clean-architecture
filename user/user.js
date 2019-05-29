module.exports.buildMakeUser = function buildMakeUser() {
  return function makeUser({
    username,
    password
  }) {
    username = username.trim();

    if (!username) {
      throw new Error('User must have a username');
    }

    if (!password) {
      throw new Error('User must have a password');
    }
  };
};
