const mockUserDb = require('../data/user-db.mock');
const { makeUser } = require('../user');
const { buildUnlikeUser } = require('./unlike-user');
const { buildLikeUser } = require('./like-user');

const unlikeUser = buildUnlikeUser({ userDataStore: mockUserDb });
const likeUser = buildLikeUser({ userDataStore: mockUserDb });

const likingUser = {
  username: 'user1',
  password: 'user1password',
};

const likedUser = {
  username: 'user2',
  password: 'user2password',
};

const notLikedUser = {
  username: 'user3',
  password: 'user3password',
};

async function insertUser(userData) {
  const user = await makeUser(userData);
  await mockUserDb.insert({ username: user.username, password: await user.hashedPassword() });

  return user;
}

describe('Unlike user', () => {
  afterEach(async () => {
    await mockUserDb.clear();
  });

  it('should fail on invalid username', async () => {
    const user = await insertUser(likingUser);

    let error;

    try {
      await unlikeUser(user.username, likedUser.username);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('should not decrease likes when un-liking user that you never liked', async () => {
    const user = await insertUser(likingUser);
    const userToLike = await insertUser(likedUser);
    const userNotToLike = await insertUser(notLikedUser);

    await likeUser(user.username, userToLike.username);

    await unlikeUser(user.username, userNotToLike.username);

    const fromDB = await mockUserDb.findByUsername(userToLike.username);

    expect(fromDB.likes).toEqual(1);
  });


  it('should decrease likes when un-liking user that you liked', async () => {
    const user = await insertUser(likingUser);
    const userToLike = await insertUser(likedUser);

    await likeUser(user.username, userToLike.username);

    await unlikeUser(user.username, userToLike.username);

    const fromDB = await mockUserDb.findByUsername(userToLike.username);

    expect(fromDB.likes).toEqual(0);
  });
});
