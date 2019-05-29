const { makeUser } = require('./index');

describe('user', () => {
  it('must have a username', () => {
    const userData = { username: null };

    expect(makeUser(userData)).rejects;
  });

  it('must have a non-empty username', () => {
    const userData = { username: '' };

    expect(makeUser(userData)).rejects;
  });

  it('must have a non-white-space username', () => {
    const userData = { username: '\n    \t' };

    expect(makeUser(userData)).rejects;
  });

  it('must have a password', () => {
    const userData = { username: 'dummy', password: null };

    expect(makeUser(userData)).rejects;
  });

  it('should have trimmed username', async () => {
    const username = '  dummy \t \n';
    const trimmedUsername = username.trim();

    const userData = { username, password: 'dummyPassword' };

    expect(makeUser(userData)).resolves.toMatchObject({ username: trimmedUsername });
  });

  it('should have hashed password', async () => {
    const password = 'dummyPassword';

    const userData = { username: 'dummy', password };

    expect(makeUser(userData)).resolves.not.toMatchObject({ password });
  });
});
