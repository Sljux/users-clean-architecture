const { authorizeFromHeader } = require('./authorize');

module.exports.buildLikeUserController = function buildLikeUserController({ likeUser, authorize }) {
  return async function likeUserController(req, res) {
    let currentUser;

    try {
      const decoded = await authorizeFromHeader(req.headers, authorize);

      currentUser = decoded.data;
    } catch (e) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    const username = req.params.id;

    try {
      await likeUser(currentUser, username);

      res.status(204).json({ message: 'User liked' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
