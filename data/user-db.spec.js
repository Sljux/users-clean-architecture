const mongodb = require('mongodb');
const { buildUserDb } = require('./user-db');

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_TEST_NAME || 'users-test';
const client = new MongoClient(url, { useNewUrlParser: true });

let dbConnection;

function getDbConnection() {
  return dbConnection;
}

const userDb = buildUserDb({ getDbConnection });

const user = {
  username: 'dummy',
  password: 'dummyPassword',
};

describe('Users Db', () => {
  beforeAll(async () => {
    if (!client.isConnected()) {
      await client.connect();
    }

    dbConnection = client.db(dbName);
  });

  afterEach(async () => {
    await userDb.clear();
  });

  it('should add user', async () => {
    const inserted = await userDb.insert(user);
    const saved = await userDb.findByUsername(user.username);

    expect(inserted.username).toEqual(saved.username);
    expect(inserted.password).toEqual(saved.password);
  });
});
