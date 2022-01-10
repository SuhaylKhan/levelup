"use strict";
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define(
    "Venue",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL(15, 13),
        allowNull: false,
      },
      lng: {
        type: DataTypes.DECIMAL(15, 13),
        allowNull: false,
      },
    },
    {}
  );
  Venue.associate = function (models) {
    // associations can be defined here
    Venue.hasMany(models.Event, { foreignKey: 'venueId' })
  };
  return Venue;
};
