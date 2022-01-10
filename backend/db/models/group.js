'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    adminId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
    Group.belongsTo(models.User, { foreignKey: 'adminId' })
    Group.belongsToMany(models.User, {
      through: 'Member',
      otherKey: 'userId',
      foreignKey: 'groupId'
    })
    Group.hasMany(models.Comment, { foreignKey: 'groupId' })
    Group.hasMany(models.Event, { foreignKey: 'groupId' })
  };
  return Group;
};
