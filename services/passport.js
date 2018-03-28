const mongoose = require('mongoose');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./../config/keys');

const User = mongoose.model('User');

//creates the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (existingUser) {
        const reallyExistingUser = await User.findOne({ googleId: profile.id });
        if (reallyExistingUser) {
          return done(null, reallyExistingUser);
        }
        User.findOneAndUpdate(
          { email: profile.emails[0].value },
          { $set: { googleId: profile.id } },
          (err, doc) => {
            if (err) {
              return done(err, doc);
            }
            return done(null, doc);
          }
        );
        //done(err, user)
        //already have a User record with that googleId
      }
      const user = await new User({
        googleId: profile.id,
        email: profile.emails[0].value
      }).save();
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: [
        'id',
        'email',
        'link',
        'locale',
        'name',
        'timezone',
        'updated_time',
        'verified'
      ]
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (existingUser) {
        const reallyExistingUser = await User.findOne({
          facebookId: profile.id
        });
        if (reallyExistingUser) {
          return done(null, reallyExistingUser);
        }
        User.findOneAndUpdate(
          { email: profile.emails[0].value },
          { $set: { facebookId: profile.id } },
          (err, doc) => {
            if (err) {
              return done(err, doc);
            }
            return done(null, doc);
          }
        );
        //done(err, user)
        //already have a User record with that googleId
      }
      const user = await new User({
        facebookId: profile.id,
        email: profile.emails[0].value
      }).save();
      return done(null, user);
    }
  )
);
