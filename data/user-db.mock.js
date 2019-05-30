const userMap = new Map();

async function findByUsername(username) {
  return userMap.get(username);
}

async function insert(user) {
  userMap.set(user.username, user);
}

async function updatePassword(user) {
  const fromDb = await findByUsername(user.username);
  fromDb.password = user.password;
}

async function clear() {
  userMap.clear();
}

module.exports = {
  findByUsername,
  insert,
  clear,
  updatePassword,
};
