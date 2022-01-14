'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Members', [
      {
        userId: 1,
        groupId: 10
      },
      {
        userId: 1,
        groupId: 7
      },
      {
        userId: 2,
        groupId: 8
      },
      {
        userId: 2,
        groupId: 3
      },
      {
        userId: 3,
        groupId: 7
      },
      {
        userId: 3,
        groupId: 1
      },
      {
        userId: 4,
        groupId: 4
      },
      {
        userId: 4,
        groupId: 7
      },
      {
        userId: 5,
        groupId: 4
      },
      {
        userId: 5,
        groupId: 2
      },
      {
        userId: 6,
        groupId: 8
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Members', {
      userId: { [Op.in]: [1, 3] }
    }, {});
  }
};
