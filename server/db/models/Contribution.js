const Sequelize = require('sequelize');
const db = require('../db');

const Contribution = db.define('contribution', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  projectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  //in Wei
  contributionAmount: Sequelize.INTEGER,
});

module.exports = Contribution;
