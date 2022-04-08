const router = require('express').Router();
const {
  models: { Project, Scientist, Contribution, Category, User },
} = require('../db');
module.exports = router;

// GET Single Project on api/project/id
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [Contribution, Category],
    });
    let scientistsWithUserInfo = await project.getScientists({
      include: [{model: User, attributes: ['id', 'firstName', 'lastName']}]
    });
    res.json({ project: project, scientists: scientistsWithUserInfo });
  } catch (error) {
    next(error);
  }
});
