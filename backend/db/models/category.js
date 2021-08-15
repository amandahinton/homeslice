'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    type: DataTypes.STRING,
    iconClass: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    let maps = { through: 'Events_Category', foreignKey: 'categoryId', otherKey: 'eventId' }
    Category.belongsToMany(models.Event, maps);
  };
  return Category;
};
