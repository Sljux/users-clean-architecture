const mockUserDb = require('../data/user-db.mock');
const { makeUser } = require('../user');
const { buildListUsers } = require('./list-users');
const { buildLikeUser } = require('./like-user');

const listUsers = buildListUsers({ userDataStore: mockUserDb });
const likeUser = buildLikeUser({ userDataStore: mockUserDb });

const users = [];
const numberOfUsers = 20;

for (let i = 0; i < numberOfUsers; i++) {
  users.push({
    username: 'dummy' + i,
    password: 'dummyPassword' + i,
  });
}

async function insertUser(userData) {
  const user = await makeUser(userData);
  await mockUserDb.insert({ username: user.username, password: await user.hashedPassword() });
}

async function insertAllUsers() {
  return Promise.all(users.map(u => insertUser(u)));
}

async function addLikes() {
  const promises = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const userToBeLiked = users[i];

    for (let j = i + 1; j < numberOfUsers; j++) {
      const userToLike = users[j];

      promises.push(likeUser(userToLike.username, userToBeLiked.username));
    }
  }

  return Promise.all(promises);
}

function isSorted(array, compFn) {
  for (let i = 0; i < array.length - 1; i++) {
    if (compFn(array[i], array[i + 1]) < 0) {
      return false;
    }
  }

  return true;
}

function isSortedByUsername(array, sortOrder = 'asc') {
  const order = sortOrder === 'asc' ? 1 : -1;

  return isSorted(array, (a, b) => order * b.username.localeCompare(a.username));
}

async function prepareUsers() {
  await insertAllUsers();
  await addLikes();
}

describe('List users', () => {
  beforeAll(async () => {
    await prepareUsers();
  });

  afterAll(async () => {
    await mockUserDb.clear();
  });

  it('should sort by username ascending by default', async () => {
    let users = await listUsers();

    expect(isSortedByUsername(users, 'asc')).toEqual(true);
  });
});
