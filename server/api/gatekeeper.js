const {
  models: { User },
} = require('../db');

const requireScientistToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.type === 'scientist') req.scientist = user;
    next();
  } catch (error) {
    next(error);
  }
};

const requireUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requireScientistToken,
  requireUserToken,
};
