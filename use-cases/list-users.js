module.exports.buildListUsers = function buildListUsers({ userDataStore }) {
  return async function listUsers({ sortBy, sortOrder, limit, skip } = { sortBy: 'username', sortOrder: 'asc' }) {
    return userDataStore.listUsers({ sortBy, sortOrder, limit, skip });
  }
};
