module.exports.buildLikeUser = function buildLikeUser({ userDataStore }) {
  return async function likeUser(currentUsername, usernameToLike) {
    if (currentUsername === usernameToLike) {
      throw new Error(`Can't like yourself`);
    }

    const userToLike = await userDataStore.findByUsername(usernameToLike);

    if (!userToLike) {
      throw new Error('User to like not found');
    }

    return userDataStore.likeUser(userToLike, currentUsername);
  };
};
