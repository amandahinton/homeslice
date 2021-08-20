'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: DataTypes.DATE,
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255],
      },
    },
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
