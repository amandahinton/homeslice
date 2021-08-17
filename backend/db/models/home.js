'use strict';
module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define('Home', {
    street: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 100],
      },
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 100],
      },
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 2],
      },
    },
    zipcode: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 10],
      },
    },
    photoUrl: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255],
      },
    },
    sqft: DataTypes.INTEGER,
    beds: DataTypes.INTEGER,
    baths: DataTypes.INTEGER,
    yearBuilt: DataTypes.INTEGER
  }, {});
  Home.associate = function(models) {
    let maps = { through: 'Bookings', foreignKey: 'homeId', otherKey: 'eventId' }
    Home.belongsToMany(models.Event, maps);
    Home.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Home;
};
