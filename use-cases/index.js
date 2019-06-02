const { buildSignUpUser } = require('./sign-up-user');
const { buildEncodeUserToToken } = require('./encode-user-to-token');
const { buildLoginUser } = require('./login-user');
const { buildAuthorize } = require('./authorize');
const { buildChangeUserPassword } = require('./change-user-password');
const { buildLikeUser } = require('./like-user');
const { buildUnlikeUser } = require('./unlike-user');
const { buildFetchUser } = require('./fetch-user');
const { buildListUsers } = require('./list-users');

const { userDb } = require('../data');

const encodeUserToToken = buildEncodeUserToToken();
const signUpUser = buildSignUpUser({ userDataStore: userDb, encodeUserToToken });
const loginUser = buildLoginUser({ userDataStore: userDb, encodeUserToToken });
const authorize = buildAuthorize();
const changeUserPassword = buildChangeUserPassword({ userDataStore: userDb });
const likeUser = buildLikeUser({ userDataStore: userDb });
const unlikeUser = buildUnlikeUser({ userDataStore: userDb });
const fetchUser = buildFetchUser({ userDataStore: userDb });
const listUsers = buildListUsers({ userDataStore: userDb });

module.exports = {
  signUpUser,
  encodeUserToToken,
  loginUser,
  authorize,
  changeUserPassword,
  likeUser,
  unlikeUser,
  fetchUser,
  listUsers,
};
