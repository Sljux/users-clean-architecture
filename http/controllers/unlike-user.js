const { authorizeFromHeader } = require('./authorize');

module.exports.buildUnlikeUserController = function buildUnlikeUserController({ unlikeUser, authorize }) {
  return async function unlikeUserController(req, res) {
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
      await unlikeUser(currentUser.username, username);

      res.status(201).json({ message: 'User un-liked' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
