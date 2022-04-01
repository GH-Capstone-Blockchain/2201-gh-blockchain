const router = require("express").Router();
const {
  models: { User, Project, Category, Scientist },
} = require("../db");

const { requireScientistToken, requireUserToken } = require("./gatekeeper");

module.exports = router;

//get all projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll({ include: Category });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

//get all projects associated with a specific scientist ..."/api/projects/scientist/:id"
router.get("/scientist/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {include: Scientist})
    const scientist = await Scientist.findByPk(user.scientist.id, { include: Project });
    const projects = scientist.projects;
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// create new project
router.post("/", async (req, res, next) => {
  try {
    // if (!req.user) throw new Error('Unauthorized');
    const newProject = await Project.create(req.body.project);
    await newProject.addScientists(req.body.scientists);
    Promise.all(req.body.categories.map(category => newProject.createCategory({ category: category })))
    res.send(newProject);
  } catch (error) {
    next(error);
  }
});
//update project
router.put("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    const response = await project.update(req.body);
    res.status(204);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
