'use strict';
module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define('Home', {
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING,
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
