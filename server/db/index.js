//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Project = require('./models/Project')
const Category = require('./models/Category')
const Contribution = require('./models/Contribution')
const Scientist = require('./models/Scientist')

User.hasMany(Contribution)
Project.hasMany(Contribution)

User.hasOne(Scientist)
Scientist.belongsTo(User)

Project.hasMany(Category)

Scientist.belongsToMany(Project, {through: 'scientist_project'})
Project.belongsToMany(Scientist, {through: 'scientist_project'})



module.exports = {
  db,
  models: {
    User,
    Project,
    Category,
    Contribution, 
    Scientist,
  },
}
