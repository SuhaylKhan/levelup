'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Demo Dan',
        email: 'demo@user.io',
        username: 'DemoUser',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Neha Fallon',
        email: 'neha@user.io',
        username: 'Neha F',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Sara Andrijana',
        email: 'sara@user.io',
        username: 'Sara A',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Nikhil Herminia',
        email: 'nikhil@user.io',
        username: 'Nikhil Herminia',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Séarlas Ritchie',
        email: 'searlas@user.io',
        username: 'Searlas R.',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Hiroko İlker',
        email: 'hiroko@user.io',
        username: 'Hiroko İlker',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Valentinus Haralamb',
        email: 'valentinus@user.io',
        username: 'Valentinus H',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Helmfrid Lukács',
        email: 'helmfrid@user.io',
        username: 'Helmfrid Lukács',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Kristina Touthmosis',
        email: 'kristina@user.io',
        username: 'Kristina T.',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fullName: 'Peony Chinonso',
        email: 'peony@user.io',
        username: 'Peony Chinonso',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
