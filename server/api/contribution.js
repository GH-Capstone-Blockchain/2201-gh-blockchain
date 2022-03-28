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
        const projectContributions = await project.getContributions();
        res.json(projectContributions);
    } catch (error) {
        next(error);
    }
})