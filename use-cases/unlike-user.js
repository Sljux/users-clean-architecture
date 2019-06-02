module.exports.buildUnlikeUser = function buildUnlikeUser({ userDataStore }) {
  return async function unlikeUser(currentUsername, usernameToUnlike) {
    if (currentUsername === usernameToUnlike) {
      throw new Error(`Can't un-like yourself`);
    }

    const userToUnlike = await userDataStore.findByUsername(usernameToUnlike);

    if (!userToUnlike) {
      throw new Error('User to unlike not found');
    }

    return userDataStore.unlikeUser(userToUnlike, currentUsername);
  }
};
