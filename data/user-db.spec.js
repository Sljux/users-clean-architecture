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

const anotherUser = {
  username: 'dummy1',
  password: 'dummyPassword1',
};

const yetAnotherUser = {
  username: 'dummy2',
  password: 'dummyPassword2',
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

  it('should change password', async () => {
    const inserted = await userDb.insert(user);

    const updatedUser = { username: inserted.username, password: inserted.password + 'SomethingMore' };
    await userDb.updatePassword(updatedUser);

    const saved = await userDb.findByUsername(user.username);

    expect(saved.password).not.toEqual(inserted.password);
  });

  it('should add a like', async () => {
    const likingUser = await userDb.insert(user);
    const likedUser = await userDb.insert(anotherUser);

    await userDb.likeUser(likedUser, likingUser.username);

    const fromDb = await userDb.findByUsername(likedUser.username);

    expect(fromDb.likes).toEqual(1);
  });

  it(`shouldn't add a like twice from same user`, async () => {
    const likingUser = await userDb.insert(user);
    const likedUser = await userDb.insert(anotherUser);

    await userDb.likeUser(likedUser, likingUser.username);
    await userDb.likeUser(likedUser, likingUser.username);

    const fromDb = await userDb.findByUsername(likedUser.username);

    expect(fromDb.likes).toEqual(1);
  });

  it('should add two likes from two different users', async () => {
    const likingUser1 = await userDb.insert(user);
    const likingUser2 = await userDb.insert(yetAnotherUser);
    const likedUser = await userDb.insert(anotherUser);

    await userDb.likeUser(likedUser, likingUser1.username);
    await userDb.likeUser(likedUser, likingUser2.username);

    const fromDb = await userDb.findByUsername(likedUser.username);

    expect(fromDb.likes).toEqual(2);
  });

  it('should remove like', async () => {
    const likingUser = await userDb.insert(user);
    const likedUser = await userDb.insert(anotherUser);

    await userDb.likeUser(likedUser, likingUser.username);
    await userDb.unlikeUser(likedUser, likingUser.username);

    const fromDb = await userDb.findByUsername(likedUser.username);

    expect(fromDb.likes).toEqual(0);
  });

  it(`shouldn't remove like twice from same user`, async () => {
    const likingUser = await userDb.insert(user);
    const likedUser = await userDb.insert(anotherUser);

    await userDb.likeUser(likedUser, likingUser.username);
    await userDb.unlikeUser(likedUser, likingUser.username);
    await userDb.unlikeUser(likedUser, likingUser.username);

    const fromDb = await userDb.findByUsername(likedUser.username);

    expect(fromDb.likes).toEqual(0);
  });

  it('should add two likes from two different users', async () => {
    const likingUser1 = await userDb.insert(user);
    const likingUser2 = await userDb.insert(yetAnotherUser);
    const likedUser = await userDb.insert(anotherUser);

    await userDb.likeUser(likedUser, likingUser1.username);
    await userDb.likeUser(likedUser, likingUser2.username);

    await userDb.unlikeUser(likedUser, likingUser1.username);
    await userDb.unlikeUser(likedUser, likingUser2.username);

    const fromDb = await userDb.findByUsername(likedUser.username);

    expect(fromDb.likes).toEqual(0);
  });
});
