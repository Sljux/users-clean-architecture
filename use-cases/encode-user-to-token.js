const { encodeToken } = require('../token');

module.exports.buildEncodeUserToToken = function buildEncodeUserToToken() {
  return async function encodeUserToToken(user) {
    const data = { username: user.username };

    return encodeToken({ data });
  }
};
