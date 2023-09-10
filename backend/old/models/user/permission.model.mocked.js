var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const permissionMocked = dbMock.define('permission', {
  name: "user:read",
  isDeleted: false,
})

permissionMocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'findOne':
      if (queryOptions[0].where.id === 1) {
        // Result found, return it
        return permissionMocked.build({ id: 1, name: 'user:read' });
      }

      if (queryOptions[0].where.id === 2) {
        return permissionMocked.build({ id: 2, name: 'user:edit' });
      }

      return null;
    case 'findAndCountAll':
      if (queryOptions[0].include?.model?.name === "roleManyPermission") {
        return {
          count: 2,
          rows: [
            permissionMocked.build({ id: 1, name: 'user:read' }),
            permissionMocked.build({ id: 2, name: 'user:edit' }),

          ]
        };
      }
      if (queryOptions[0].include?.model?.name === "userManyPermission") {
        return {
          count: 1,
          rows: [
            permissionMocked.build({ id: 1, name: 'user:read' }),

          ]
        };
      }

      if (queryOptions[0].offset !== undefined && queryOptions[0].limit !== undefined) {
        return {
          count: 2,
          rows: [
            permissionMocked.build({ id: 2, name: 'user:edit' }),
          ]
        };
      }

      if (queryOptions[0]?.where?.id !== undefined) {
        return {
          count: 1,
          rows: [
            permissionMocked.build({ id: 1, name: 'user:read' }),
          ]
        };
      }

      return null

    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          permissionMocked.build({ id: 1, name: 'user:read' }),
          permissionMocked.build({ id: 2, name: 'user:edit' }),

        ]
      }

      return null

    // search

    default:
      break;
  }


});

module.exports = { permissionMocked };

