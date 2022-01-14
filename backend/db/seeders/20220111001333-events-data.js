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
      },
      {
        hostId: 7,
        groupId: 2,
        name: 'Get Out With Us',
        description: 'Just some casual gamers playing a hardcore game. What could go wrong?',
        date: new Date('Jan 20 2022 22:40:00 -06'),
        capacity: 12,
        inPerson: false
      },
      {
        hostId: 6,
        groupId: 3,
        name: 'Tourney on the High Seas',
        description: 'Gather a crew for a brigantine and test your skill against the best pirates on the seas!',
        date: new Date('Feb 3 2022 22:15:00 -06'),
        capacity: 30,
        inPerson: false
      },
      {
        hostId: 4,
        groupId: 6,
        name: 'Vault of Glass',
        description: "The grind don't stop til we all have the Mythoclast",
        date: new Date('Jan 21 2022 20:50:00 -06'),
        capacity: 18,
        inPerson: false
      },
      {
        hostId: 1,
        groupId: 1,
        name: 'Pandemic Party',
        venueId: 1,
        description: 'This time we see who can beat Pandemic the quickest or lose trying. As always, meet us at The Gaming Goat.',
        date: new Date('Jan 21 2022 18:45:00 -06'),
        capacity: 12,
        inPerson: true
      },
      {
        hostId: 10,
        groupId: 5,
        name: 'Apex Tournament',
        description: 'You think you have what it takes to be a Predator? Show us what you got.',
        date: new Date('Jan 19 2022 21:15:00 -06'),
        capacity: 12,
        inPerson: false
      },
      {
        hostId: 9,
        groupId: 10,
        name: 'Discord Watch (and explode) Party',
        description: 'Trying all sorts of crazy bomb defusals. It should be a fun and interesting time.',
        date: new Date('Feb 4 2022 16:25:00 -06'),
        capacity: 20,
        inPerson: false
      },
      {
        hostId: 4,
        groupId: 1,
        name: 'Poker Night',
        venueId: 1,
        description: "Feeling lucky? Test your luck with Texas Hold 'em",
        date: new Date('Feb 2 2022 21:40:00 -06'),
        capacity: 30,
        inPerson: true
      },
      {
        hostId: 2,
        groupId: 9,
        name: 'To Infinite and Beyond!',
        description: "We'll be running customs. If we can get enough people we'll do an oddball tournament!",
        date: new Date('Jan 26 2022 20:00:00 -06'),
        capacity: 24,
        inPerson: false
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      hostId: { [Op.in]: [2, 3] }
    }, {});
  }
};
