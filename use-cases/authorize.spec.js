const { authorize } = require('./index');

describe('Authorize', () => {
  it('should fail on no token', async () => {
    let error;

    try {
      await authorize(null);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('should fail on invalid token', async () => {
    let error;

    try {
      await authorize('invalidJwtToken');
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it('should return decoded token on valid token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSIsImlhdCI6MTU1OTE3MDYyNiwiZXhwIjoxNTU5MjU3MDI2fQ.W-LkbV0hVBLloOfZVupOIr846f7folvDdL-8Oj8FZNg';

    const decoded = await authorize({ token });

    expect(decoded.data).toMatchObject({ some: 'data' });
  });
});
