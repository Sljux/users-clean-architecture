const { makeUser } = require('./index');

describe('user', () => {
  it('must have a username', async () => {
    const userData = { username: null, password: 'dummy' };

    try {
      await makeUser(userData);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('must have a non-empty username', async () => {
    const userData = { username: '', password: 'dummy' };

    try {
      await makeUser(userData);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('must have a non-white-space username', async () => {
    const userData = { username: '\n    \t', password: 'dummy' };

    try {
      await makeUser(userData);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('must have a password', async () => {
    const userData = { username: 'dummy', password: null };

    try {
      await makeUser(userData);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should have trimmed username', async () => {
    const username = '  dummy \t \n';
    const trimmedUsername = username.trim();

    const userData = { username, password: 'dummyPassword' };

    const user = await makeUser(userData);

    expect(user.username).toEqual(trimmedUsername);
    expect(user.username).not.toEqual(username);
  });

  it('should have hashed password', async () => {
    const password = 'dummyPassword';

    const userData = { username: 'dummy', password };

    const user = await makeUser(userData);

    expect(user.password).not.toEqual(password);
  });
});
