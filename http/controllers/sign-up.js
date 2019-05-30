module.exports.buildSignUpController = function buildSignUpController({ signUpUser }) {
  return async function signUpController(req, res) {
    const userData = req.body;

    try {
      const token = await signUpUser(userData);

      res.status(201).json({ token });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
