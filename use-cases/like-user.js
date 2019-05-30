module.exports.buildLikeUser = function buildLikeUser({ userDataStore }) {
  return async function likeUser(currentUser, usernameToLike) {
    const user = await userDataStore.findByUsername(currentUser.username);
    const userToLike = await userDataStore.findByUsername(usernameToLike);

    if (!userToLike) {
      throw new Error('User to like not found');
    }

    return userDataStore.likeUser(userToLike, user.username);
  };
};
