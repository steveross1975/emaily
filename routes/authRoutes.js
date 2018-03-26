const passport = require('passport');

module.exports = app => {
  //the string google is set in the Passport-Google Strategy
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
