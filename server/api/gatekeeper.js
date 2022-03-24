const {
  models: { User },
} = require('../db');

const requireAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.type === 'admin') req.admin = user;
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
  requireAdminToken,
  requireUserToken,
};
