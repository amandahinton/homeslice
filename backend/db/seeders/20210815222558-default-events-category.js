'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Events_Categories',
      [
        {
          eventId: 1,
          categoryId: 1
        },
        {
          eventId: 2,
          categoryId: 2
        },
        {
          eventId: 2,
          categoryId: 11
        },
        {
          eventId: 3,
          categoryId: 8
        },
        {
          eventId: 4,
          categoryId: 7
        },
        {
          eventId: 5,
          categoryId: 3
        },
        {
          eventId: 6,
          categoryId: 2
        },
        {
          eventId: 7,
          categoryId: 3
        },
        {
          eventId: 7,
          categoryId: 11
        },
        {
          eventId: 8,
          categoryId: 3
        },
        {
          eventId: 9,
          categoryId: 3
        },
        {
          eventId: 9,
          categoryId: 6
        },
        {
          eventId: 10,
          categoryId: 3
        },
        {
          eventId: 11,
          categoryId: 2
        },
        {
          eventId: 12,
          categoryId: 2
        },
        {
          eventId: 12,
          categoryId: 6
        },
        {
          eventId: 13,
          categoryId: 10
        },
        {
          eventId: 13,
          categoryId: 3
        },
        {
          eventId: 14,
          categoryId: 11
        },
        {
          eventId: 14,
          categoryId: 4
        },
        {
          eventId: 15,
          categoryId: 10
        },
        {
          eventId: 15,
          categoryId: 7
        },
        {
          eventId: 16,
          categoryId: 11
        },
        {
          eventId: 17,
          categoryId: 11
        },
        {
          eventId: 18,
          categoryId: 8
        },
        {
          eventId: 19,
          categoryId: 7
        },
        {
          eventId: 19,
          categoryId: 4
        },
        {
          eventId: 20,
          categoryId: 10
        },
        {
          eventId: 21,
          categoryId: 10
        },
        {
          eventId: 22,
          categoryId: 10
        },
        {
          eventId: 23,
          categoryId: 10
        },
        {
          eventId: 24,
          categoryId: 7
        },
        {
          eventId: 25,
          categoryId: 7
        },
        {
          eventId: 26,
          categoryId: 2
        },
        {
          eventId: 27,
          categoryId: 6
        },
        {
          eventId: 28,
          categoryId: 4
        },
        {
          eventId: 29,
          categoryId: 3
        },
        {
          eventId: 30,
          categoryId: 5
        },
        {
          eventId: 30,
          categoryId: 11
        },
        {
          eventId: 31,
          categoryId: 4
        },
        {
          eventId: 31,
          categoryId: 11
        },
        {
          eventId: 32,
          categoryId: 2
        },
        {
          eventId: 32,
          categoryId: 11
        },
        {
          eventId: 33,
          categoryId: 3
        },
        {
          eventId: 33,
          categoryId: 11
        },
        {
          eventId: 34,
          categoryId: 9
        },
        {
          eventId: 34,
          categoryId: 11
        },
        {
          eventId: 35,
          categoryId: 2
        },
        {
          eventId: 36,
          categoryId: 4
        },
        {
          eventId: 37,
          categoryId: 10
        },
        {
          eventId: 37,
          categoryId: 7
        },
        {
          eventId: 38,
          categoryId: 3
        },
        {
          eventId: 39,
          categoryId: 2
        },
        {
          eventId: 39,
          categoryId: 11
        },
        {
          eventId: 40,
          categoryId: 10
        },
        {
          eventId: 41,
          categoryId: 10
        },
        {
          eventId: 42,
          categoryId: 10
        },
        {
          eventId: 43,
          categoryId: 10
        },
        {
          eventId: 43,
          categoryId: 5
        },
        {
          eventId: 44,
          categoryId: 10
        },
        {
          eventId: 44,
          categoryId: 7
        },
        {
          eventId: 45,
          categoryId: 4
        },
        {
          eventId: 46,
          categoryId: 4
        },
        {
          eventId: 47,
          categoryId: 9
        },
        {
          eventId: 48,
          categoryId: 3
        },
        {
          eventId: 49,
          categoryId: 4
        },
      ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events_Categories', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
