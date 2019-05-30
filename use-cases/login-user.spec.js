const mockUserDb = require('../data/user-db.mock');
const { makeUser } = require('../user');
const { buildLoginUser } = require('./login-user');
const { buildEncodeUserToToken } = require('./encode-user-to-token');

const encodeUserToToken = buildEncodeUserToToken();
const loginUser = buildLoginUser({ userDataStore: mockUserDb, encodeUserToToken });

const userData = {
  username: 'dummy',
  password: 'dummyPassword',
};

const userWrongPassword = {
  username: userData.username,
  password: userData.password + 'SomethingMore',
};

async function insertUser() {
  const user = await makeUser(userData);
  await mockUserDb.insert({ username: user.username, password: await user.hashedPassword() });
}

describe('Login user', () => {
  beforeEach(async () => {
    await mockUserDb.clear();
  });

  it('should fail when user with username not saved', async () => {
    let error;

    try {
      await loginUser(userData);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it(`should fail when user found, but passwords don't match`, async () => {
    await insertUser();

    let error;

    try {
      await loginUser(userWrongPassword);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('should return token on valid login', async () => {
    await insertUser();

    const token = await loginUser(userData);

    expect(token).toBeTruthy();
  });
});
