'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const [guests, metadata] = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE username = 'guest'`
    );
    const demoUser = guests[0]

    return queryInterface.bulkInsert(
      'Homes',
      [
        {
          street: "14229 Robb Road",
          city: "Presidero",
          state: "CA",
          zipcode: "94306",
          userId: demoUser.id,
          photoUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
          sqft: 4540,
          beds: 4,
          baths: 5,
          yearBuilt: "2010"
        },
        {
          street: "18 Deerhill Place",
          city: "Montbrook",
          state: "CT",
          zipcode: "06021",
          userId: demoUser.id,
          photoUrl: "https://cdn.pixabay.com/photo/2017/03/17/08/53/house-2151102_1280.jpg",
          sqft: 1995,
          beds: 3,
          baths: 2,
          yearBuilt: 1840
        }
      ]
    );
  },
  down: async (queryInterface, Sequelize) => {
    const [guests, metadata] = await queryInterface.sequelize.query(
      `SELECT * FROM "Users" WHERE username = 'guest'`
    );
    const demoUser = guests[0]
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Homes', {
      userId: { [Op.eq]: demoUser.id }
    }, {});
  }
};
