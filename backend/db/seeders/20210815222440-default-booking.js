'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const [homes, metadata] = await queryInterface.sequelize.query(
      `SELECT "Homes"."id" FROM "Homes" JOIN "Users" ON "Homes"."userId" = "Users"."id" WHERE username = 'guest';`
    );
    const demoHome1 = homes[0]
    const demoHome2 = homes[1]

    return queryInterface.bulkInsert(
      'Bookings',
      [
        {
          date: new Date(Date.now() + (6.048e+8 * 2)),
          title: "Get pool drained, patched, painted, and filled",
          description: "Address the large crack running across bottom and up south side",
          intervalDays: 0,
          homeId: demoHome1.id,
          eventId: 1,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 2)),
          title: "Care for house plants",
          description: "Water, prune, and fertilize when needed",
          intervalDays: 7,
          homeId: demoHome1.id,
          eventId: 12,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 3)),
          title: 'Clean high surfaces',
          description: 'Wipe down or dust the tops of appliances, doorways, windows, and moldings',
          intervalDays: 40,
          homeId: demoHome1.id,
          eventId: 40,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 4)),
          title: 'Maintain oven/range/stove',
          description: 'Deep clean, inspect gas line and elements, lubricate blower motor',
          intervalDays: 180,
          homeId: demoHome1.id,
          eventId: 25,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 5)),
          title: 'Deep clean bathrooms',
          description: 'Time to scrub',
          intervalDays: 30,
          homeId: demoHome1.id,
          eventId: 21,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 5)),
          title: 'Reseal kitchen and bathroom fixtures',
          description: 'Inspect all sinks, showers, tubs, and toilets for deterioration in caulk or seals',
          intervalDays: 365,
          homeId: demoHome1.id,
          eventId: 14,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 6)),
          title: 'Maintain window and door screens',
          description: 'Inspect screens for tears or holes and repair or replace mesh',
          intervalDays: 180,
          homeId: demoHome1.id,
          eventId: 38,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 7)),
          title: 'Maintain decking or patio',
          description: 'Powerwash, repair damage, and repaint/reseal as needed',
          intervalDays: 365,
          homeId: demoHome1.id,
          eventId: 28,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 8)),
          title: "Maintain lawn and garden",
          description: "Water plants and lawn, weed, fertilize and remove debris",
          intervalDays: 7,
          homeId: demoHome1.id,
          eventId: 9,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 9)),
          title: "Powerwash windows and siding",
          description: "Rent a powerwasher and give your entire exterior a spray",
          intervalDays: 365,
          homeId: demoHome1.id,
          eventId: 13,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 10)),
          title: "Paint exterior",
          description: "Repaint home exterior every 3-10 years depending on material, quality, and wear",
          intervalDays: 1095,
          homeId: demoHome1.id,
          eventId: 10,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 11)),
          title: "Touch up interior walls, ceilings, and baseboards",
          description: "Patch cracks and holes and repaint as needed",
          intervalDays: 365,
          homeId: demoHome1.id,
          eventId: 11,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 3)),
          title: "Clean gutters and downspouts",
          description: "Remove leaves and debris and check for proper water runoff",
          intervalDays: 180,
          homeId: demoHome2.id,
          eventId: 5,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 5)),
          title: "Inspect roof",
          description: "Look for leaks and damage to shingles",
          intervalDays: 365,
          homeId: demoHome2.id,
          eventId: 7,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 6)),
          title: 'Maintain insulation',
          description: 'Check insulation in attic, crawlspace, and around plumbing, repair or replace as needed',
          intervalDays: 365,
          homeId: demoHome2.id,
          eventId: 8,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 40)),
          title: 'Clean drains',
          description: 'Check flow, look for leaks, and santize drains in sinks, tubs, showers, and dishwashers',
          intervalDays: 30,
          homeId: demoHome2.id,
          eventId: 8,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 12)),
          title: 'Prune shrubs and trees',
          description: 'Clear up branches around walkways, powerlines, and home structure, prune for healthy growth, inspect for damage',
          intervalDays: 90,
          homeId: demoHome2.id,
          eventId: 27,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 4)),
          title: "Get new mailbox",
          description: "Install mailbox with flag for outgoing mail",
          intervalDays: 1000,
          homeId: demoHome2.id,
          eventId: 1,
        },
        {
          date: new Date(Date.now() + (6.048e+8 * 30)),
          title: 'Maintain decking or patio',
          description: 'Powerwash, repair damage, and repaint/reseal as needed',
          intervalDays: 365,
          homeId: demoHome2.id,
          eventId: 28,
        },
      ]
    );
  },
  down: async (queryInterface, Sequelize) => {
    const [guestHomes, metadata] = await queryInterface.sequelize.query(
      `SELECT DISTINCT "homeId" FROM "Bookings" JOIN "Homes" ON "Bookings"."homeId" = "Homes"."id" JOIN "Users" ON "Homes"."userId" = "Users"."id" WHERE username = 'guest';`
    );
    const Op = Sequelize.Op;
    const idArray = guestHomes.map(home => home.homeId);
    return queryInterface.bulkDelete('Bookings', {
      homeId: { [Op.in]: idArray}
    }, {});
  }
};
