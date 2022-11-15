const { Sequelize } = require('sequelize');
const config = require('./config/config');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
