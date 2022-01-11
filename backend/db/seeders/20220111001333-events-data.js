'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        hostId: 2,
        groupId: 1,
        venueId: 1,
        name: 'Board Game Night',
        description: 'Come join us for a night of mysteries and betrayals as we play Betrayal at House on the Hill',
        date: new Date('Jan 15 2022 17:00:00 -06'),
        capacity: 30,
        inPerson: true
      },
      {
        hostId: 3,
        groupId: 2,
        name: 'GTFO Online Party',
        description: 'Hop into discord and play GTFO with the gang or just come to chill out and watch us die a bunch',
        date: new Date('Jan 20 2022 12:00:00 -06'),
        capacity: 20,
        inPerson: false
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      hostId: { [Op.in]: [2, 3] }
    }, {});
  }
};
