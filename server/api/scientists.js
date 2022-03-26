const router = require("express").Router();
const {
  models: { Scientist, User },
} = require("../db");
module.exports = router;

// get all scientists with user info --- api/scientists
router.get("/", async (req, res, next) => {
  try {
    const scientists = await Scientist.findAll({ include: User });
    res.json(scientists);
  } catch (error) {
    next(error);
  }
});

//create scientist
router.post("/", async (req, res, next) => {
  try {
    const id = req.body.id;
    const user = await User.findByPk(id)
    const scientist = await user.createScientist({
      publications: req.body.publications,
      credentials: req.body.credentials
    })
    res.json(scientist)
  } catch (error) {
    next(error);
  }
});
