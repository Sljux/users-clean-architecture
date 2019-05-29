module.exports.buildMakeUser = function buildMakeUser({ hash }) {
  return async function makeUser({
    username,
    password
  }) {
    checkForUsername(username);

    username = username.trim();

    checkForUsername(username);

    if (!password) {
      throw new Error('User must have a password');
    }

    const hashedPassword = await hash(password);

    return {
      get username() {
        return username;
      },

      get password() {
        return hashedPassword;
      }
    };
  };
};

function checkForUsername(username) {
  if (!username) {
    throw new Error('User must have a username');
  }
}
