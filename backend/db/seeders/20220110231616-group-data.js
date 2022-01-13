'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        adminId: 2,
        name: 'Board Gamers',
        description: 'This is a group for all board game enthusiasts old and new! Come join us for our weekly board game nights!'
      },
      {
        adminId: 3,
        name: 'GTFO',
        description: 'WE NEED MORE PRISONERS! Regular game nights for hardcore and casual GTFOers alike.'
      },
      {
        adminId: 1,
        name: 'A Pirates Life For Me',
        description: 'Arrgh we be needin more pirates for our crew. Sail with us on the Sea of Thieves!'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ['Board Gamers', 'GTFO', 'A Pirates Life For Me'] }
    }, {});
  }
};
