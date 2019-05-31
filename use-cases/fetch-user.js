module.exports.buildFetchUser = function buildFetchUser({ userDataStore }) {
  return async function fetchUser(username) {
    const user = await userDataStore.findByUsername(username);

    if (!user) {
      throw new Error('No user with that username');
    }

    return {
      username: user.username,
      likes: user.likes,
    }
  };
};
