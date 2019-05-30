const mockUserDb = require('../data/user-db.mock');
const { buildSignUpUser } = require('./sign-up-user');
const { buildEncodeUserToToken } = require('./encode-user-to-token');

const encodeUserToToken = buildEncodeUserToToken();
const signUpUser = buildSignUpUser({ userDataStore: mockUserDb, encodeUserToToken });

const user = {
  username: 'dummy',
  password: 'dummyUsername',
};

describe('Sign up user', () => {
  beforeEach(async () => {
    await mockUserDb.clear();
  });

  it('should add user to user data store', async () => {
    await signUpUser(user);

    const savedUser = await mockUserDb.findByUsername(user.username);

    expect(savedUser).toBeTruthy();
  });

  it('should not allow duplicate username', async () => {
    try {
      await signUpUser(user);
      await signUpUser(user);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should return token on valid sign up', async () => {
    const token = await signUpUser(user);

    expect(token).toBeTruthy();
  });
});
