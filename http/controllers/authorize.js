module.exports.authorizeFromHeader = async function authorizeFromHeader(headers, authorize) {
  const header = headers.authorization || '';
  const token = header.split(' ')[1];

  return authorize({ token });
};
