const { encodeToken } = require('./index');

describe('Token', () => {
  it('should have data to sign', async () => {
    try {
      await encodeToken({ data: null });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should produce encoded token', async () => {
    const encodedToken = await encodeToken({ data: { some: 'data' } });

    expect(typeof encodedToken).toBe('string');
    expect(encodedToken.length).toBeGreaterThan(0);
  });
});
