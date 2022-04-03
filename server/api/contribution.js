const router = require('express').Router();
const {
  models: { Project, Scientist, Contribution, Category, User },
} = require('../db');
module.exports = router;

// add contribution
router.post('/', async (req, res, next) => {
  try {
    const contribution = await Contribution.create(req.body);
    res.json(contribution);
  } catch (error) {
    next(error);
  }
});

//get contributions for specific project
router.get('/:projectId', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.projectId);
        const projectContributions = await project.getContributions({include: [User, Project]});
        res.json(projectContributions);
    } catch (error) {
        next(error);
    }
})

//get contributions for specific user
router.get('/user/:userId', async (req, res, next) => {
  try {
      const project = await Contribution.findAll({
        where: {userId: req.params.userId},
        include: [Project, User]
      });
      res.json(project);
  } catch (error) {
      next(error);
  }
})

//update contribution
router.put('/:contributionId', async (req, res, next) => {
  try {
    const contribution = await Contribution.findByPk(req.params.contributionId);
    const response = await contribution.update(req.body);
    res.status(204);
    res.send(response);
  } catch (err) {
    next(err);
  }
});