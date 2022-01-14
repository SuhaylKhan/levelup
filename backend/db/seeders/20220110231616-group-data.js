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
        name: 'Sea of Thieves',
        description: 'Arrgh we be needin more pirates for our crew. Sail with us on the Sea of Thieves!'
      },
      {
        adminId: 9,
        name: 'Among Us',
        description: 'Who said Among Us was dead? Not us! Among us is forever.'
      },
      {
        adminId: 2,
        name: 'Apex Legends',
        description: 'Whether you are new or on the path to apex predator, all are welcome here.'
      },
      {
        adminId: 9,
        name: 'Destiny 2',
        description: 'The more the merrier! Witch Queen is right around the corner, the perfect time to start playing or continue the grind.'
      },
      {
        adminId: 2,
        name: "Don't Starve Together",
        description: "Winter is coming... That means it's time to stalk those beefalo and hunt us a deerclops!"
      },
      {
        adminId: 1,
        name: 'Factorio',
        description: 'We see transport belts in our sleep...'
      },
      {
        adminId: 2,
        name: 'Halo Infinite',
        description: 'Competitive or casual, Halo is a game for everyone!'
      },
      {
        adminId: 3,
        name: 'Keep Talking and Nobody Explodes',
        description: 'We keep talking and we keep exploding.'
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
