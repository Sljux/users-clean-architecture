const { verifyToken } = require('./index');

describe('Verify token', () => {
  it('should have token to verify', async () => {
    try {
      await verifyToken({ token: null });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should decode a valid token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoiZGF0YSIsImlhdCI6MTU1OTQ4OTkwMCwiZXhwIjozMTM3MzY5OTAwfQ.kS6BiRick3pr3pVwQXFGE5T3QgBehw1SoFiemvvxouk';

    const verified = await verifyToken({ token });

    expect(verified.data).toMatchObject({ some: 'data' });
  });

  it('should fail on invalid token', async () => {
    const token = 'InvalidJwtToken';

    try {
      await verifyToken({ token });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
