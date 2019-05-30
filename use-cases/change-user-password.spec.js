const mockUserDb = require('../data/user-db.mock');
const { makeUser } = require('../user');
const { buildChangeUserPassword } = require('./change-user-password');
const { buildEncodeUserToToken } = require('./encode-user-to-token');

const encodeUserToToken = buildEncodeUserToToken();
const changeUserPassword = buildChangeUserPassword({ userDataStore: mockUserDb, encodeUserToToken });

const userData = {
  username: 'dummy',
  password: 'dummyPassword'
};

const userWithNewPassword = {
  username: userData.username,
  password: userData.password + 'SomethingMore',
};

async function insertUser() {
  const user = await makeUser(userData);
  await mockUserDb.insert({ username: user.username, password: await user.hashedPassword() });

  return user;
}

describe('Change user password', () => {
  afterAll(async () => {
    await mockUserDb.clear();
  });

  it('should update password', async () => {
    const user = await insertUser();

    await changeUserPassword(userWithNewPassword);

    const userFromDb = await mockUserDb.findByUsername(userWithNewPassword.username);

    expect(userFromDb.username).toEqual(userWithNewPassword.username);
    expect(user.comparePassword(userFromDb.password)).resolves.toEqual(false);
  });
});
