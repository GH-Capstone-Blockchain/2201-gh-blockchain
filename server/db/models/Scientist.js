const Sequelize = require('sequelize');
const db = require('../db');

const Scientist = db.define('scientist', {
  userId: Sequelize.INTEGER,
  publications:{
      type: Sequelize.STRING, 
    //   allowNull: false,
  }, 
  credentials: {
      type: Sequelize.STRING, 
    //   allowNull: false,
  }
});

module.exports = Scientist;