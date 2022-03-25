const router = require("express").Router();
const {
  models: { User, Project },
} = require("../db");
const { requireAdminToken, requireUserToken } = require('./gatekeeper');
module.exports = router;


//get all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// create new project
router.post('/', async (req, res, next) => {
    try {
      // if (!req.user) throw new Error('Unauthorized');
      const newProject= await Project.create(req.body.project);
      await newProject.addScientists(req.body.scientists)
      res.send(newProject);
    } catch (error) {
      next(error);
    }
  });
//update project
  router.put('/:id', async (req, res, next) => {
    try {
      const project = await Project.findByPk(req.params.id)
      const response = await project.update(req.body);
      res.status(204);
      res.send(response)
    } catch (err) {
      next(err);
    }
  });