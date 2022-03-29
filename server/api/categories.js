const router = require("express").Router();
const {
  models: { Category },
} = require("../db");
module.exports = router;

// get all categories with user info --- api/catetories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});
