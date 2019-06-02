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

  async function unlikeUser(userToUnlike, currentUsername) {
    const users = await getUserCollection();

    return users.updateOne({ username: userToUnlike.username }, { $pull: { likedBy: currentUsername } });
  }

  async function listUsers({ sortBy, sortOrder = 'asc', skip = 0, limit = 20 }) {
    validateListSort(sortBy);

    const users = await getUserCollection();

    const userArray = await findUsers(users, sortBy, sortOrder, skip, limit);

    return userArray.map(extractData);
  }

  return {
    findByUsername,
    insert,
    clear,
    updatePassword,
    likeUser,
    unlikeUser,
    listUsers,
  };
};

async function findUsers(usersCollection, sortBy, sortOrder, skip, limit) {
  switch (sortBy) {
  case 'username':
    return usersCollection.find({}, { sort: [['username', sortOrder]], skip, limit }).toArray();

  case 'likes':
    const pipeline = [
      {
        $project: {
          username: 1,
          likedBy: 1,
          likes: { $size: { $ifNull: ['$likedBy', []] } }
        },
      },

      { $sort: { likes: sortOrder === 'asc' ? 1 : -1 } },

      { $skip: skip },

      { $limit: limit },
    ];

    return usersCollection.aggregate(pipeline).toArray();
  }
}

function validateListSort(sortBy) {
  const validSortBy = ['username', 'likes'];

  if (!validSortBy.includes(sortBy)) {
    throw new Error(`Unsupported sortBy value '${sortBy}'. Must be one of: ${validSortBy.join(', ')}`);
  }
}

function extractData(result) {
  let { _id, likedBy, likes, ...data } = result;

  if (!likes) {
    likes = likedBy.length;
  }

  return { id: _id, likes, ...data };
}
