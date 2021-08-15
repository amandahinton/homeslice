'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'guest',
        firstName: 'Demo',
        lastName: 'user',
        email: 'demo@user.io',
        phone: '123-456-7890',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'BowWow',
        firstName: 'Wembley',
        lastName: 'Bowers',
        email: faker.internet.email(),
        phone: faker.internet.phone_number(),
        hashedPassword: bcrypt.hashSync('carrots'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['guest', 'BowWow'] }
    }, {});
  }
};
