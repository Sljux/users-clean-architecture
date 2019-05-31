module.exports.buildUnlikeUser = function buildUnlikeUser({ userDataStore }) {
  return async function unlikeUser(currentUsername, usernameToUnlike) {
    const userToUnlike = await userDataStore.findByUsername(usernameToUnlike);

    if (!userToUnlike) {
      throw new Error('User to unlike not found');
    }

    return userDataStore.unlikeUser(userToUnlike, currentUsername);
  }
};
