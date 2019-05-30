const { authorizeFromHeader } = require('./authorize');

module.exports.buildMeController = function buildMeController({ authorize }) {
  return async function meController(req, res) {
    let decoded;

    try {
      decoded = await authorizeFromHeader(req.headers, authorize);
    } catch (e) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    res.status(200).json({ user: decoded.data });
  };
};
