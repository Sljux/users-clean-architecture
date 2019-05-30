const { buildMakeUser } = require('./user');
const bcrypt = require('bcrypt');

async function hash(plainText) {
  const saltRounds = 10;
  return bcrypt.hash(plainText, saltRounds);
}

async function compare(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}

const makeUser = buildMakeUser({ hash, compare });

module.exports.makeUser = makeUser;
