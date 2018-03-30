module.exports = (req, res, next) => {
  if (!req.user.credit > 0) {
    return res.status(403).send({ error: 'Please add credit to your account' });
  }
  next();
};
