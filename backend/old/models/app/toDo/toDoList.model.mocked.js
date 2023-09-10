var SequelizeMock = require('sequelize-mock-v5');

var dbMock = new SequelizeMock()

const mocked = dbMock.define('toDoList', {
  name: "to do list 1",
  isDeleted: false,
})

mocked.$queryInterface.$useHandler(function (query, queryOptions, done) {
  switch (query) {
    case 'findOne':
      if (queryOptions[0]?.where?.id === 1) {
        // Result found, return it
        return mocked.build({ id: 1, name: 'to do list 1' });
      }

      if (queryOptions[0]?.where?.id === 2) {
        return mocked.build({ id: 2, name: 'to do list 2' });
      }

      if (queryOptions[0]?.where?.name === "user:manage") {
        return mocked.build({ id: 1, name: 'to do list 1' });
      }

      return null;
    case 'findAndCountAll':
      if (queryOptions[0].include?.model?.name === "toDo") {
        return {
          count: 1,
          rows: [
            mocked.build({ id: 1, name: 'to do list 1' }),

          ]
        };
      }

      if (queryOptions[0].offset !== undefined && queryOptions[0].limit !== undefined) {
        return {
          count: 1,
          rows: [
            mocked.build({ id: 2, name: 'to do list 2' }),
          ]
        };
      }

      if (queryOptions[0]?.where?.id !== undefined) {
        return {
          count: 1,
          rows: [
            mocked.build({ id: 1, name: 'to do list 1' }),
          ]
        };
      }

      return null

    case 'bulkCreate':
      if (queryOptions[0] !== undefined) {
        return [
          mocked.build({ id: 1, name: 'to do list 1' }),
          mocked.build({ id: 2, name: 'to do list 2' }),

        ]
      }

      return null

    // search

    default:
      break;
  }


});

module.exports = { mocked };

