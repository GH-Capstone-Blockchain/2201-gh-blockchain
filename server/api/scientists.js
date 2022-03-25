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
