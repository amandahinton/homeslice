'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Categories',
      [
        { type: 'custom', iconClass: "fas fa-home" },
        { type: 'interior', iconClass: "fas fa-door-open" },
        { type: 'exterior', iconClass: "fas fa-door-closed" },
        { type: 'plumbing', iconClass: "fas fa-faucet" },
        { type: 'electrical', iconClass: "lightbulb" },
        { type: 'flora', iconClass: "fas fa-leaf" },
        { type: 'appliances', iconClass: "fas fa- blender" },
        { type: 'hvac', iconClass: "fas fa-fan" },
        { type: 'structural', iconClass: "fas fa-shapes" },
        { type: 'cleaning', iconClass: "fas fa-broom" },
        { type: 'inspection', iconClass: "fas fa- search" }
      ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
