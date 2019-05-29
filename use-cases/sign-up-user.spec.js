const mockUserDataStore = require('../data/user-data.mock');
const { buildSignUpUser } = require('./sign-up-user');

const signUpUser = buildSignUpUser({ userDataStore: mockUserDataStore });

const user = {
  username: 'dummy',
  password: 'dummyUsername',
};

describe('Sign up user', () => {
  beforeEach(() => {
    mockUserDataStore.clear();
  });

  it('should add user to user data store', async () => {
    await signUpUser(user);

    const savedUser = await mockUserDataStore.findByUsername(user.username);

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
});
