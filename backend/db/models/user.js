const bcrypt = require('bcryptjs');

'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username must not be an email address');
          }
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 250],
        isEmail: {
          msg: 'Please enter a valid email address'
        }
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
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
  {     // protect sensitive user info, not exposed to other users
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'],
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
  User.prototype.toSafeObject = function () {      // { User info safe to save to JWT }
    const { id, username, firstName, lastName, email, phone } = this;     // context is User instance
    return { id, username, firstName, lastName, email, phone };
  };
  User.prototype.validatePassword = function (password) {      // true if hashed password match
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {     // find user by id
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function ({ credential, password }) {      // find and validate user at login
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
  User.signup = async function ({ username, firstName, lastName, email, phone, password }) {      // hash password and create user
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      phone,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  User.associate = function (models) {
    User.hasMany(models.Home, { foreignKey: 'userId' });
  };
  return User;
};
