var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const userRequestMocked = dbMock.define('userRequest', {
  name: "user:read",
  isDeleted: false,
})

userRequestMocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'findOne':
      if (queryOptions[0].where.id === 1) {
        // Result found, return it
        return userRequestMocked.build({ id: 1, email: 'user1@email.com', username: "user1", name: "user1", status: "PENDING" });
      }

      if (queryOptions[0].where.id === 2) {
        return userRequestMocked.build({ id: 2, email: 'user2@email.com', username: "user2", name: "user2", status: "ACCEPTED" });
      }

      return null;
    case 'findAndCountAll':
      //   if (queryOptions[0].include?.model?.name === "roleManyUserRequest") {
      //     return {
      //       count: 2,
      //       rows: [
      //         userRequestMocked.build({ id: 1, name: 'user:read' }),
      //         userRequestMocked.build({ id: 2, name: 'user:edit' }),

      //       ]
      //     };
      //   }
      //   if (queryOptions[0].include?.model?.name === "userManyUserRequest") {
      //     return {
      //       count: 1,
      //       rows: [
      //         userRequestMocked.build({ id: 1, name: 'user:read' }),

      //       ]
      //     };
      //   }

      if (queryOptions[0].offset !== undefined && queryOptions[0].limit !== undefined) {
        return {
          count: 2,
          rows: [
            userRequestMocked.build({ id: 2, email: 'user2@email.com', username: "user2", name: "user2", status: "ACCEPTED" }),
          ]
        };
      }

      if (queryOptions[0]?.where?.id !== undefined) {
        return {
          count: 1,
          rows: [
            userRequestMocked.build({ id: 1, email: 'user1@email.com', username: "user1", name: "user1", status: "PENDING" })
          ]
        };
      }

      return null

    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          userRequestMocked.build({ id: 1, email: 'user1@email.com', username: "user1", name: "user1", status: "PENDING" }),
          userRequestMocked.build({ id: 2, email: 'user2@email.com', username: "user2", name: "user2", status: "ACCEPTED" }),

        ]
      }

      return null

    // search

    default:
      break;
  }


});

module.exports = { userRequestMocked };

