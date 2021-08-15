'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    intervalDays: DataTypes.INTEGER,
    homeId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    // join table for homes and events
  };
  return Booking;
};
