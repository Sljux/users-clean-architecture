const userMap = new Map();

async function findByUsername(username) {
  return userMap.get(username);
}

async function insert(user) {
  userMap.set(user.username, user);
}

async function clear() {
  userMap.clear();
}

module.exports = {
  findByUsername,
  insert,
  clear,
};
