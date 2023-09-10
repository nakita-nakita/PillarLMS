var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const userManyPermissionMocked = dbMock.define('userManyPermission', {
    userId: 1,
    permissionId: 1,
})

userManyPermissionMocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
    switch (query) {
      case 'bulkCreate':
        if (queryOptions[0] !== undefined) {
          return [
            {
              userId: 1,
              permissionId: 1
            },
            {
              userId: 1,
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
  
module.exports = { userManyPermissionMocked };

