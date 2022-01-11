'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
        isUnique(value) {
          return User.findOne({ where: { username: value } })
            .then(name => {
              if (name) throw new Error('Sorry, that username is taken.')
            })
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isUnique(value) {
          return User.findOne({ where: { email: value } })
            .then(email => {
              if (email) throw new Error('That email is already registered to an account.')
            })
        }
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Group, { foreignKey: 'adminId' })
    User.belongsToMany(models.Group, {
      through: 'Member',
      otherKey: 'groupId',
      foreignKey: 'userId'
    })
    User.hasMany(models.Comment, { foreignKey: 'userId' })
    User.hasMany(models.Event, { foreignKey: 'hostId' })
    User.belongsToMany(models.Event, {
      through: 'RSVP',
      otherKey: 'eventId',
      foreignKey: 'userId'
    })
  };
  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({ fullName, username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      fullName,
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  return User;
};
