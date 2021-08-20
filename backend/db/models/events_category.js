'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events_Category = sequelize.define('Events_Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  Events_Category.associate = function(models) {
    // join table for events and categories
  };
  return Events_Category;
};
