module.exports.buildReadUserController = function buildReadUserController({ fetchUser }) {
  return async function readUserController(req, res) {
    const username = req.params.id;

    try {
      const user = await fetchUser(username);

      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
