var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const roleManyPermissionMocked = dbMock.define('roleManyPermission', {
  roleId: 1,
  permissionId: 1
})

roleManyPermissionMocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          {
            roleId: 1,
            permissionId: 1
          },
          {
            roleId: 1,
            permissionId: 2
          },
        ]
      }

      return null

    // search

    default:
      break;
  }
});

module.exports = { roleManyPermissionMocked };

