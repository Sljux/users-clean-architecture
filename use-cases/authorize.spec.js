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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1bW15MTAiLCJpYXQiOjE1NTkzMTAyMDcsImV4cCI6MTU1OTM5NjYwN30.zZKig9AZ1eZTE3MeP0AkHerhzOJpwSVd5q55w1ZbdSI';

    const decoded = await authorize({ token });

    expect(decoded.data).toMatchObject({ username: 'dummy10' });
  });
});
