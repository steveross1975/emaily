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
      callbackURL: keys.appURL + '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }).then(existingUser => {
        if (existingUser) {
          User.findOne({ googleId: profile.id }).then(reallyExistingUser => {
            if (reallyExistingUser) {
              done(null, reallyExistingUser);
            } else {
              User.findOneAndUpdate(
                { email: profile.emails[0].value },
                { $set: { googleId: profile.id } },
                (err, doc) => {
                  if (err) {
                    done(err, doc);
                  }
                  done(null, doc);
                }
              );
            }
          });
          //done(err, user)
          //already have a User record with that googleId
        } else {
          new User({
            googleId: profile.id,
            email: profile.emails[0].value
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookAppSecret,
      callbackURL: keys.appURL + '/auth/facebook/callback',
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
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }).then(existingUser => {
        if (existingUser) {
          User.findOne({ facebookId: profile.id }).then(reallyExistingUser => {
            if (reallyExistingUser) {
              done(null, reallyExistingUser);
            } else {
              User.findOneAndUpdate(
                { email: profile.emails[0].value },
                { $set: { facebookId: profile.id } },
                (err, doc) => {
                  if (err) {
                    done(err, doc);
                  }
                  done(null, doc);
                }
              );
            }
          });
        } else {
          new User({
            facebookId: profile.id,
            email: profile.emails[0].value
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
