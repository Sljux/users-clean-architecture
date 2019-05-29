const jwt = require('jsonwebtoken');

async function sign(data, secret, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, options, (err, token) => {
      if (err) {
        return reject(err);
      }

      resolve(token);
    });
  });
}

async function verify(data, secret, options) {
  return new Promise((resolve, reject) => {
    jwt.verify(data, secret, options, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
}

module.exports = {
  sign,
  verify,
};
