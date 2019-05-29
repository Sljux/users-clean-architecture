const { buildMakeUser } = require('./user');
const bcrypt = require('bcrypt');

async function hash(plainText) {
  const saltRounds = 10;

  return bcrypt.hash(plainText, saltRounds);
}

const makeUser = buildMakeUser({ hash });

module.exports.makeUser = makeUser;
