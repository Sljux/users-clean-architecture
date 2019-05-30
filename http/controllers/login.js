module.exports.buildLoginController = function buildLoginController({ loginUser }) {
  return async function loginController(req, res) {
    const userData = req.body;

    try {
      const token = await loginUser(userData);

      res.status(201).json({ token });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
