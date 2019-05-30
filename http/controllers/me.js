module.exports.buildMeController = function buildMeController({ authorize }) {
  return async function meController(req, res) {
    const header = req.headers.authorization || '';
    const token = header.split(' ')[1];

    let decoded;

    try {
      decoded = await authorize({ token });
    } catch (e) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    res.status(200).json({ user: decoded.data });
  };
};
