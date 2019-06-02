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

const bulkUsers = [];
const numberOfUsers = 20;

for (let i = 0; i < numberOfUsers; i++) {
  bulkUsers.push({
    username: 'dummy' + i,
    password: 'dummyPassword' + i,
  });
}

async function insertBulkUsers() {
  return Promise.all(bulkUsers.map(u => userDb.insert(u)));
}

async function addLikes() {
  const promises = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const userToBeLiked = bulkUsers[i];

    for (let j = 0; j < numberOfUsers - i; j++) {
      const userToLike = bulkUsers[j];

      promises.push(userDb.likeUser(userToLike, userToBeLiked.username));
    }
  }

  return Promise.all(promises);
}

async function prepareBulkUsers() {
  await insertBulkUsers();
  await addLikes();
}

function isSorted(array, compFn) {
  for (let i = 0; i < array.length - 1; i++) {
    if (compFn(array[i], array[i + 1]) < 0) {
      return false;
    }
  }

  return true;
}

function isSortedByUsername(array, sortOrder = 'asc') {
  const order = sortOrder === 'asc' ? -1 : 1;

  return isSorted(array, (a, b) => order * a.username.localeCompare(b.username));
}

function isSortedByLikes(array, sortOrder = 'asc') {
  const order = sortOrder === 'asc' ? -1 : 1;

  return isSorted(array, (a, b) => order * (a.likes - b.likes));
}

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

  describe('insert', () => {
    it('should add user', async () => {
      const inserted = await userDb.insert(user);
      const saved = await userDb.findByUsername(user.username);

      expect(inserted.username).toEqual(saved.username);
      expect(inserted.password).toEqual(saved.password);
    });
  });

  describe('update password', () => {
    it('should change password', async () => {
      const inserted = await userDb.insert(user);

      const updatedUser = { username: inserted.username, password: inserted.password + 'SomethingMore' };
      await userDb.updatePassword(updatedUser);

      const saved = await userDb.findByUsername(user.username);

      expect(saved.password).not.toEqual(inserted.password);
    });
  });

  describe('like user', () => {
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
  });

  describe('unlike user', () => {
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

    it('should remove two likes from two different users', async () => {
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

  describe('list users', () => {
    it('should fail on invalid sort key', async () => {
      await prepareBulkUsers();

      let error;

      try {
        await userDb.listUsers({ sortBy: 'something-not-valid' });
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(Error);
    });

    it('should sort by username ascending', async () => {
      await prepareBulkUsers();

      const users = await userDb.listUsers({ sortBy: 'username', sortOrder: 'asc' });

      expect(isSortedByUsername(users, 'asc')).toEqual(true);
    });

    it('should sort by username descending', async () => {
      await prepareBulkUsers();

      const users = await userDb.listUsers({ sortBy: 'username', sortOrder: 'desc' });

      expect(isSortedByUsername(users, 'desc')).toEqual(true);
    });

    it('should sort by likes ascending', async () => {
      await prepareBulkUsers();

      const users = await userDb.listUsers({ sortBy: 'likes', sortOrder: 'asc' });

      expect(isSortedByLikes(users, 'asc')).toEqual(true);
    });

    it('should sort by likes descending', async () => {
      await prepareBulkUsers();

      const users = await userDb.listUsers({ sortBy: 'likes', sortOrder: 'desc' });

      expect(isSortedByLikes(users, 'desc')).toEqual(true);
    });

    it('should skip from beginning', async () => {
      await prepareBulkUsers();

      const skip = 5;

      const users = await userDb.listUsers({ sortBy: 'username', sortOrder: 'asc' });
      const usersSkipped = await userDb.listUsers({ sortBy: 'username', sortOrder: 'asc', skip });

      expect(users[skip].username).toEqual(usersSkipped[0].username);
    });

    it('should limit to length', async () => {
      await prepareBulkUsers();

      const limit = numberOfUsers - 5;

      const users = await userDb.listUsers({ sortBy: 'username', sortOrder: 'asc', limit });

      expect(users.length).toEqual(limit);
    });
  });
});
