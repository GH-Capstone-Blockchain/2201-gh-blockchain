const Sequelize = require("sequelize");
const db = require("../db");

const Category = db.define("category", {
  category: {
    type: Sequelize.ENUM(
      "Biology",
      "Ecology",
      "Education",
      "Psychology",
      "Mathematics",
      "Chemistry",
      "Physics",
      "Paleontology",
      "Anthropology",
      "Engineering",
      "Social Science",
      "Materials Science",
      "Medicine",
      "Art and Design",
      "Data Science",
      "Economics",
      "Earth Science",
      "Neuroscience",
      "Political Science",
      "Computer Science"
    ),
  },
  projectId: Sequelize.INTEGER,
});

module.exports = Category;
