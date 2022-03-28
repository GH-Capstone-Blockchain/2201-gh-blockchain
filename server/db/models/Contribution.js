const Sequelize = require("sequelize");
const db = require("../db");
const Project = require("./Project");

const Contribution = db.define("contribution", {
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

const findTotalContribution = async (contribution) => {
  console.log(contribution)
  let project = await Project.findByPk(contribution.projectId);
  console.log(project)
  if (
    project.totalDonations + contribution.contributionAmount >
    project.fundraising_goal
  ) {
    await project.update({
      totalDonations: project.totalDonations + contribution.contributionAmount,
      reachedGoal: true,
    });
  } else
    await project.update({
      totalDonations: project.totalDonations + contribution.contributionAmount,
    });
};

Contribution.afterCreate(findTotalContribution);
