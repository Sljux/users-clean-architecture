const { authorizeFromHeader } = require('./authorize');

module.exports.buildUpdatePasswordController = function buildUpdatePasswordController({ changeUserPassword, authorize }) {
  return async function signUpController(req, res) {
    let username;

    try {
      const decoded = await authorizeFromHeader(req.headers, authorize);

      username = decoded.data.username;
    } catch (e) {
      console.log(e);

      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    const { password } = req.body;

    try {
      await changeUserPassword({ username, password });

      res.status(204).json({ message: 'Updated' });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
