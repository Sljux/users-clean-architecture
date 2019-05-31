const userMap = new Map();

async function findByUsername(username) {
  const fromDb = userMap.get(username);

  if (!fromDb) {
    return null;
  }

  return {
    username: fromDb.username,
    password: fromDb.password,
    likes: fromDb.likedBy.length,
  };
}

async function insert(user) {
  userMap.set(user.username, { likedBy: [], ...user });
}

async function updatePassword(user) {
  const fromDb = userMap.get(user.username);
  fromDb.password = user.password;
}

async function clear() {
  userMap.clear();
}

async function likeUser(userToLike, username) {
  const fromDb = userMap.get(userToLike.username);

  if (!fromDb) {
    return;
  }

  if (!fromDb.likedBy.includes(username)) {
    fromDb.likedBy.push(username);
  }
}

async function unlikeUser(userToUnlike, username) {
  const fromDb = userMap.get(userToUnlike.username);

  if (!fromDb) {
    return;
  }

  const index = fromDb.likedBy.indexOf(username);

  if (index > -1) {
    fromDb.likedBy.splice(index, 1);
  }
}

module.exports = {
  findByUsername,
  insert,
  clear,
  updatePassword,
  likeUser,
  unlikeUser,
};
