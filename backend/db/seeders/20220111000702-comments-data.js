'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        groupId: 1,
        content: 'We should totally play Dead of Winter soon!'
      },
      {
        userId: 3,
        groupId: 1,
        content: 'Oooh that game looks like so much fun'
      },
      {
        userId: 3,
        groupId: 3,
        content: 'Anyone down to run a brigantine this weekend?'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Comments', {
      userId: { [Op.in]: [1, 3] }
    }, {});
  }
};
