const mockUserDb = require('../data/user-db.mock');
const { makeUser } = require('../user');
const { buildFetchUser } = require('./fetch-user');

const fetchUser = buildFetchUser({ userDataStore: mockUserDb });

const userData = {
  username: 'dummy',
  password: 'dummyPassword'
};

async function insertUser() {
  const user = await makeUser(userData);
  await mockUserDb.insert({ username: user.username, password: await user.hashedPassword() });

  return user;
}

describe('Fetch user', () => {
  afterEach(async () => {
    await mockUserDb.clear();
  });

  it('should fail on invalid username', async () => {
    let error;

    try {
      await fetchUser(userData.username);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('should return username and number of likes and no password for valid user', async () => {
    await insertUser();

    const fromDb = await fetchUser(userData.username);

    expect(fromDb.username).toEqual(userData.username);
    expect(fromDb.likes).toEqual(0);
    expect(fromDb.password).toBeUndefined();
  });
});
