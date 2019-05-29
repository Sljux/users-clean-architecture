const { makeUser } = require('./index');

describe('user', () => {
  it('must have a username', () => {
    const userData = { username: null };
    expect(() => { makeUser(userData) }).toThrow();
  });

  it('must have a non-empty username', () => {
    const userData = { username: '' };
    expect(() => { makeUser(userData) }).toThrow();
  });

  it('must have a non-white-space username', () => {
    const userData = { username: '\n    \t' };
    expect(() => { makeUser(userData) }).toThrow();
  });

  it('must have a password', () => {
    const userData = { username: 'dummy', password: null };
    expect(() => { makeUser(userData) }).toThrow();
  })
});
