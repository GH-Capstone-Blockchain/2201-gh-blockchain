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
      const newProject= await Project.create(req.body);
      res.send(newProject);
    } catch (error) {
      next(error);
    }
  });