const mongodb = require('mongodb');
const { buildUserDb } = require('./user-db');

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'users';
const client = new MongoClient(url, { useNewUrlParser: true });

async function getDbConnection() {
  if (!client.isConnected()) {
    await client.connect();
  }

  return client.db(dbName);
}

module.exports.userDb = buildUserDb({ getDbConnection });
