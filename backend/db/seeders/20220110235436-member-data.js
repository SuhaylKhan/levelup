'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Members', [
      {
        userId: 1,
        groupId: 2
      },
      {
        userId: 3,
        groupId: 1
      },
      {
        userId: 3,
        groupId: 3
      },
      {
        userId: 1,
        groupId: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Members', {
      userId: { [Op.in]: [1, 3] }
    }, {});
  }
};
