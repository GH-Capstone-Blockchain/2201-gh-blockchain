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
  contributionAmount: Sequelize.BIGINT,
});

module.exports = Contribution;

const findTotalContribution = async (contribution) => {
  let contributionAmount = parseInt(contribution.contributionAmount)
  let project = await Project.findByPk(contribution.projectId);
  let totalDonations = parseInt(project.totalDonations)
  if (
    totalDonations + contributionAmount >
    project.fundraising_goal
  ) {
    await project.update({
      totalDonations: totalDonations + contributionAmount,
      reachedGoal: true,
    });
  } else {
    await project.update({
      totalDonations: totalDonations + contributionAmount,
    });
  }
};

Contribution.afterCreate(findTotalContribution);
