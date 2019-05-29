module.exports.buildEncodeToken = function buildEncodeToken({ encode }) {
  return async function encodeToken({
    data,
    expiresIn = '1d',
  }) {
    if (!data) {
      throw new Error('Token must have data to encode');
    }

    return await encode(data, { expiresIn });
  };
};
