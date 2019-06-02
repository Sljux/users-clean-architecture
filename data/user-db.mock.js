const userMap = new Map();

function cleanUser(fromDb) {
  return {
    username: fromDb.username,
    password: fromDb.password,
    likes: fromDb.likedBy.length,
  };
}

async function findByUsername(username) {
  const fromDb = userMap.get(username);

  if (!fromDb) {
    return null;
  }

  return cleanUser(fromDb);
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

async function listUsers({ sortBy, sortOrder = 'asc', skip = 0, limit = 20 }) {
  const users = [];

  userMap.forEach((user) => {
    users.push(cleanUser(user));
  });

  const order = sortOrder === 'asc' ? 1 : -1;

  switch (sortBy) {
  case 'username':
    users.sort((a, b) => order * a.username.localeCompare(b.username));
    break;
  case 'likes':
    users.sort((a, b) => order * (a.likes - b.likes));
    break;
  default:
    break;
  }

  return users.slice(skip, skip + limit);
}

module.exports = {
  findByUsername,
  insert,
  clear,
  updatePassword,
  likeUser,
  unlikeUser,
  listUsers,
};
