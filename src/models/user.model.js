const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');
const { roles } = require('../config/roles');
const { toJSON } = require('./plugins');

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      trim: true,
      minlength: 8,
      allowNull: false,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      },
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: DataTypes.STRING,
      enum: roles,
      defaultValue: 'user',
      validate: {
        notEmpty: true,
      },
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

User.prototype.toJSON = toJSON;
// User.paginate = paginate;
User.prototype.isPasswordMatch = async function (enteredPassword) {
  // console.log(this)
  return bcrypt.compare(enteredPassword, this.password);
};

// add plugin that converts sequelize to json
// User.plugin(toJSON);
// User.plugin(paginate);

module.exports = User;
