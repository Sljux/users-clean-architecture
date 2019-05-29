module.exports.buildVerifyToken = function buildVerifyToken({ verify }) {
  return async function verifyToken({ token }) {
    if (!token) {
      throw new Error('Must have token to verify');
    }

    const verified = await verify(token);
    const { iat, exp, ...data } = verified.payload;

    return {
      get data() {
        return data;
      },

      get issuedAt() {
        return new Date(iat * 1000);
      },

      get expires() {
        return new Date(exp * 1000);
      },
    }
  }
};
