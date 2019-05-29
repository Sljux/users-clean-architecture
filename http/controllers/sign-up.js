module.exports.buildSignUpController = function buildSignUpController({ signUpUser }) {
  return async function signUpController(req, res) {
    const userData = req.body;

    try {
      await signUpUser(userData);
      res.status(201)
        .send('Created');
    } catch (e) {
      res.status(400)
        .send({
          error: e.message,
        });
    }
  };
};
