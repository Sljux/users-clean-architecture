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

  if (!fromDb.likedBy.includes(username)) {
    fromDb.likedBy.push(username);
  }
}

module.exports = {
  findByUsername,
  insert,
  clear,
  updatePassword,
  likeUser,
};
