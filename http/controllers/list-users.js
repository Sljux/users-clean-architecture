module.exports.buildMostLikedUsersController = function buildMostLikedUsersController({ listUsers }) {
  return async function mostLikedUsersController(req, res) {
    const { skip = 0, limit = 100 } = req.query;

    try {
      const users = await listUsers({ sortBy: 'likes', sortOrder: 'descending', skip, limit });

      res.status(200).json(users);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
