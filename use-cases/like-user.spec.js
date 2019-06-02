const mockUserDb = require('../data/user-db.mock');
const { makeUser } = require('../user');
const { buildLikeUser } = require('./like-user');

const likeUser = buildLikeUser({ userDataStore: mockUserDb });

const likingUser = {
  username: 'user1',
  password: 'user1password',
};

const likedUser = {
  username: 'user2',
  password: 'user2password',
};

async function insertUser(userData) {
  const user = await makeUser(userData);
  await mockUserDb.insert({ username: user.username, password: await user.hashedPassword() });

  return user;
}

describe('Like user', () => {
  afterEach(async () => {
    await mockUserDb.clear();
  });

  it('should fail on invalid username', async () => {
    const user = await insertUser(likingUser);

    let error;

    try {
      await likeUser(user.username, likedUser.username);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('should add like on valid username', async () => {
    const user = await insertUser(likingUser);
    const userToLike = await insertUser(likedUser);

    await likeUser(user.username, likedUser.username);

    const fromDB = await mockUserDb.findByUsername(userToLike.username);

    expect(fromDB.likes).toEqual(1);
  });

  it('should not allow self-like', async () => {
    const user = await insertUser(likingUser);

    let error;

    try {
      await likeUser(user.username, user.username);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });
});
