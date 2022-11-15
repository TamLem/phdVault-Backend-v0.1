const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../config/tokens');

const Token = sequelize.define(
  'tokens',
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

Token.prototype.toJSON = toJSON;

// add plugin that converts mongoose to json
// tokenSchema.plugin(toJSON);

module.exports = Token;
