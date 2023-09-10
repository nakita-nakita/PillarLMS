var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const userManyRoleMocked = dbMock.define('userManyRole', {
  userId: 1,
  roleId: 1,
})

userManyRoleMocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          {
            userId: 1,
            roleId: 1,
          },
          {
            userId: 2,
            roleId: 1,
          },
        ]
      }

      return null

    // search

    default:
      break;
  }
});

module.exports = { userManyRoleMocked };

