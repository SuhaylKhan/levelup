'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venueId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inPerson: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: 'hostId' })
    Event.belongsTo(models.Group, { foreignKey: 'groupId' })
    Event.belongsTo(models.Venue, { foreignKey: 'venueId' })
    Event.belongsToMany(models.User, {
      through: 'RSVP',
      otherKey: 'userId',
      foreignKey: 'eventId'
    })
  };
  return Event;
};
