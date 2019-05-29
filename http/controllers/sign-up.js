module.exports.buildSignUpController = function buildSignUpController({ signUpUser, encodeUserToToken }) {
  return async function signUpController(req, res) {
    const userData = req.body;

    try {
      const savedUser = await signUpUser(userData);
      const token = await encodeUserToToken(savedUser);

      res.status(201).json({ token });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
};
