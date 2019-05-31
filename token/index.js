const { buildEncodeToken } = require('./encode-token');
const { buildVerifyToken } = require('./verify-token');
const jwt = require('./jwt-sign');

const secret = process.env.TOKEN_SECRET || 'top-secret';
const expiresIn = process.env.TOKEN_EXPIRY || '100y';

async function encode(data, options) {
  return jwt.sign(data, secret, options);
}

async function verify(data) {
  return jwt.verify(data, secret, { complete: true });
}

const encodeToken = buildEncodeToken({ encode, expiresIn });
const verifyToken = buildVerifyToken({ verify });

module.exports.encodeToken = encodeToken;
module.exports.verifyToken = verifyToken;
