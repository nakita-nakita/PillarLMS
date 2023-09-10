var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const userMocked = dbMock.define('user', {
  username: "Bugs",
  email: "bugs@amce.com",
  password: "",
  isDeleted: false,
})


userMocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'findOne':
      if (queryOptions[0]?.where?.id === 1) {
        // Result found, return it
        return userMocked.build({ id: 1, username: 'Bugs', email: "bugs@acme.com", password: "" });
      }

      if (queryOptions[0]?.where?.id === 2) {
        return userMocked.build({ id: 2, username: 'Daffy', email: "daffy@acme.com", password: "" });
      }

      return null;
    case 'findAndCountAll':
      if (queryOptions[0].include?.model?.name === "userManyRole") {
        return {
          count: 1,
          rows: [
            userMocked.build({ id: 1, username: 'Bugs', email: "bugs@acme.com", password: "" })
          ]
        };
      }

      if (queryOptions[0].offset !== undefined && queryOptions[0].limit !== undefined) {
        return {
          count: 2,
          rows: [
            userMocked.build({ id: 2, username: 'Daffy', email: "daffy@acme.com", password: "" })
          ]
        };
      }

      return null

    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          userMocked.build({ id: 1, username: 'user1', email: "user2@example.com", password: "" }),
          userMocked.build({ id: 2, username: 'user2', email: "user2@example.com", password: "" }),
        ]
      }

      return null

    // search

    default:
      break;
  }
});

module.exports = { userMocked };

