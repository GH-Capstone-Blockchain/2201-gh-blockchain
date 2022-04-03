const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Scientist = require('./Scientist')

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  profileImg: {
    type: Sequelize.STRING,
    defaultValue:
    "https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/04/Frenchie_05.jpg",
  },
  gender: {
    type: Sequelize.ENUM(
      "Female",
      "Male",
      "Non-binary",
      "Different Identity Not Listed",
      "No Response"
    ),
  },
  race: {
    type: Sequelize.ENUM(
      "American Indian or Alaska Native",
      "Asian",
      "Black or African American",
      "Native Hawaiian or Other Pacific Islander",
      "White",
      "Two or More Races",
      "No Response"
    ),
  },
  birthYear: {
    type: Sequelize.INTEGER,
  },
  //default length of string is 255 characters, IG bio is 150 characters for reference
  bio: {
    type: Sequelize.STRING,
  },
  // location: {
  //   type: Sequelize.GEOMETRY
  // },
  type: {
    type: Sequelize.ENUM("supporter", "scientist"),
    defaultValue: "supporter",
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id, {include: Scientist})
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

const capitalizeName = (user) => {
  user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
  user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()
}

// User.beforeCreate(capitalizeName) //... does not work when supporter signs up because firstname and lastname is not required to sign up
User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
