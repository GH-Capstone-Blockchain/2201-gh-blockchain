const router = require('express').Router();
const {
  models: { User, Scientist, Contribution, Project },
} = require('../db');
module.exports = router;

const { requireScientistToken, requireUserToken } = require('./gatekeeper');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', requireUserToken, async (req, res, next) => {
  try {
    if (!req.user) throw new Error('Unauthorized');
    const user = await User.findByPk(req.params.id, {
      include: [Scientist, Contribution],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireUserToken, async (req, res, next) => {
  try {
    if (!req.user) throw new Error('Unauthorized');
    const userToUpdate = await User.findByPk(req.params.id);
    const response = await userToUpdate.update(req.body);
    res.status(204);
    res.send(response);
  } catch (error) {
    next(error);
  }
});
