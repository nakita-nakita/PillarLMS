var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const roleMocked = dbMock.define('role', {
  name: "user:manager",
  isDeleted: false,
})

roleMocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'findOne':
      if (queryOptions[0]?.where?.id === 1) {
        // Result found, return it
        return roleMocked.build({ id: 1, name: 'user:manage' });
      }

      if (queryOptions[0]?.where?.id === 2) {
        return roleMocked.build({ id: 2, name: 'task:manage' });
      }

      if (queryOptions[0]?.where?.name === "admin") {
        return roleMocked.build({ id: 1, name: 'admin' });
      }

      return null;
    case 'findAndCountAll':
      if (queryOptions[0].include?.model?.name === "userManyRole") {
        return {
          count: 1,
          rows: [
            roleMocked.build({ id: 1, name: 'user:manage' }),

          ]
        };
      }

      if (queryOptions[0].offset !== undefined && queryOptions[0].limit !== undefined) {
        return {
          count: 1,
          rows: [
            roleMocked.build({ id: 2, name: 'task:manage' }),
          ]
        };
      }

      if (queryOptions[0]?.where?.id !== undefined) {
        return {
          count: 1,
          rows: [
            roleMocked.build({ id: 1, name: 'user:manage' }),
          ]
        };
      }

      return null

    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          roleMocked.build({ id: 1, name: 'user:manage' }),
          roleMocked.build({ id: 2, name: 'task:manage' }),

        ]
      }

      return null

    // search

    default:
      break;
  }


});

module.exports = { roleMocked };

