const { verifyToken } = require('../token');

module.exports.buildAuthorize = function buildAuthorize() {
  return async function authorize(token) {
    if (!token) {
      throw new Error('Not signed in');
    }

    return verifyToken(token);
  }
};
