var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const mocked = dbMock.define('toDo', {
  title: "first to do",
  dueDate: "11/12/21",
  isCompleted: false,
})

mocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'findOne':
      if (queryOptions[0].where.id === 1) {
        // Result found, return it
        return mocked.build({ id: 1, title: 'first to do' });
      }

      if (queryOptions[0].where.id === 2) {
        return mocked.build({ id: 2, title: 'second to do' });
      }

      return null;
    case 'findAndCountAll':
      if (queryOptions[0].include?.model?.name === "toDoListManyToDo") {
        return {
          count: 2,
          rows: [
            mocked.build({ id: 1, title: 'first to do' }),
            mocked.build({ id: 2, title: 'second to do' }),

          ]
        };
      }
      if (queryOptions[0].include?.model?.name === "userManyToDo") {
        return {
          count: 1,
          rows: [
            mocked.build({ id: 1, title: 'first to do' }),

          ]
        };
      }

      if (queryOptions[0].offset !== undefined && queryOptions[0].limit !== undefined) {
        return {
          count: 2,
          rows: [
            mocked.build({ id: 2, title: 'second to do' }),
          ]
        };
      }

      if (queryOptions[0]?.where?.id !== undefined) {
        return {
          count: 1,
          rows: [
            mocked.build({ id: 1, name: 'user:read' }),
          ]
        };
      }

      return null

    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          mocked.build({ id: 1, name: 'user:read' }),
          mocked.build({ id: 2, title: 'second to do' }),

        ]
      }

      return null

    // search

    default:
      break;
  }


});

module.exports = { mocked };

