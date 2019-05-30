module.exports.buildMakeUser = function buildMakeUser({ hash, compare }) {
  return async function makeUser({
    username,
    password,
  }) {
    checkForUsername(username);

    username = username.trim();

    checkForUsername(username);

    if (!password) {
      throw new Error('User must have a password');
    }

    let hashedPassword;

    return {
      get username() {
        return username;
      },

      get password() {
        return password;
      },

      async hashedPassword() {
        if (hashedPassword) {
          return hashedPassword;
        }

        return hash(password);
      },

      async comparePassword(otherPassword) {
        return compare(password, otherPassword);
      },
    };
  };
};

function checkForUsername(username) {
  if (!username) {
    throw new Error('User must have a username');
  }
}
