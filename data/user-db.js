module.exports.buildUserDb = function buildUserDb({ getDbConnection }) {
  async function getUserCollection() {
    const db = await getDbConnection();
    return db.collection('users');
  }

  async function findByUsername(username) {
    const users = await getUserCollection();

    const result = await users.find({ username });
    const found = await result.toArray();

    if (found.length === 0) {
      return null;
    }

    return extractData(found[0]);
  }

  async function insert(userData) {
    const users = await getUserCollection();

    const inserted = await users.insertOne({ likedBy: [], ...userData });

    return extractData(inserted.ops[0]);
  }

  async function clear() {
    return (await getUserCollection()).drop();
  }

  async function updatePassword(userData) {
    const users = await getUserCollection();

    return users.updateOne({ username: userData.username }, { $set: { password: userData.password } });
  }

  async function likeUser(userToLike, currentUsername) {
    const users = await getUserCollection();

    return users.updateOne({ username: userToLike.username }, { $addToSet: { likedBy: currentUsername } });
  }

  return {
    findByUsername,
    insert,
    clear,
    updatePassword,
    likeUser,
  };
};

function extractData(result) {
  const { _id, likedBy, ...data } = result;

  return { id: _id, likes: likedBy.length, ...data };
}
