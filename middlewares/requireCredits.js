module.exports = (req, res, next) => {
  if (req.user.credits < req.body.recipients.split(',').length) {
    return res.status(403).send({ error: 'Please add credit to your account' });
  }

  next();
};
