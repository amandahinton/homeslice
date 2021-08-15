'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events_Category = sequelize.define('Events_Category', {
    eventId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  Events_Category.associate = function(models) {
    // join table for events and categories
  };
  return Events_Category;
};
