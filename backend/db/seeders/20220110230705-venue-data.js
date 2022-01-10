'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [
      {
        name: 'The Gaming Goat',
        address: '160 N York St',
        city: 'Elmhurst',
        state: 'IL',
        zipCode: '60126',
        lat: 41.90228999603149,
        lng: -87.9400953
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      address: { [Op.in]: ['160 N York St'] }
    }, {});
  }
};
