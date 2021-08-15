'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    intervalDays: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    let maps1 = { through: 'Booking', foreignKey: 'eventId', otherKey: 'homeId' }
    Event.belongsToMany(models.Home, maps1);
    let maps2 = { through: 'Events-Category', foreignKey: 'eventId', otherKey: 'categoryId' }
    Event.belongsToMany(models.Category, maps2);
  };
  return Event;
};
