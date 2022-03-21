const {db, models: {User, Project, Contribution, Category, Scientist} } = require('../server/db')

for (let i of ['User', 'Project', 'Contribution', 'Category', 'Scientist']) {
  console.log('\n  --------------------------------  \n')
  console.log(`Magic methods for ${i}:`)
  console.log(Object.keys(eval(i).prototype))
}
