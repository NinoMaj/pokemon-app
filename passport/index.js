import TwitterStrategy from 'passport-twitter';
import GoogleStrategy from 'passport-google-oauth';
import GitHubStrategy from 'passport-github2';

import User from '../models/user';
import configAuth from './auth';


const isProd = process.env.NODE_ENV === 'production' ? true : false;

// Function to add a new user to DB. The 2 possible cases are decided by [action]
// parameter: New user/account ('new') or link new account to existing user ('link').
// [service] is the social service used: 'twitter', 'google', 'github'
const addUserToDB = (action, service, req, token, profile, done) => {
  const user = action === 'new' ? new User() : req.user;
  user[service].id = profile.id; // sets the user's social service id.
  user[service].token = token; // saves the token provided to the user
  user[service].displayName = profile.displayName; // saves displayName and username
  user[service].username = profile.username;

  if (!user.userName) { // Sets userName in User profile
    user.userName = profile.username;
  }

  // save our user to the database
  user.save((err) => {
    if (err) throw err
    return done(null, user);
  })
}

// Function to manage authentication response and save user to database.
const passportCallback = (service, req, token, refreshToken, profile, done) => {
  process.nextTick(() => {
    const serviceID = `${service}.id`;
    if (!req.user) { // if not user is logged in
      // find the user in the database based on their service id
      User.findOne({ [serviceID]: profile.id }, (err, user) => {
        // if there is an error, stop everything and return that
        // for example an error connecting to the database
        if (err) return done(err);
        // if the user is found, then log him/her ind
        if (user) {
          // if there is a user id already but no token (user was linked at one
          // point and then removed), just add our token and profile info.
          if (!user[service].token) {
            const addToUser = user;
            addToUser[service].token = token;
            addToUser[service].displayName = profile.displayName;
            addToUser[service].username = profile.username;

            user.save((err) => {
              if (err) throw err;
              return done(null, user);
            });
          }
          return done(null, user); // user found, return that user
        }
        // if there is no user found with that service id, create a new one
        addUserToDB('new', service, req, token, profile, done);
      });
      // user already exists and is logged in, we have to link accounts
    } else {
      User.findOne({ [serviceID]: profile.id }, (err, user) => {
        if (err) return done(err);
        if (user && user._id.toString() !== req.user._id.toString()) {
          // eslint-disable-next-line no-console
          console.error('Error: This account is already registered with another user')
          return done(null);
        }
        addUserToDB('link', service, req, token, profile, done);
      });
    }
  });
};

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
    // pull in our app id from auth.js file and secret from .env file.
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: isProd ? process.env.TWITTER_SECRET : process.env.TWITTER_SECRET_DEV,
    callbackURL: configAuth.twitterAuth.callbackURL,
    passReqToCallback: true,
  },
    (req, token, refreshToken, profile, done) => {
      passportCallback('twitter', req, token, refreshToken, profile, done);
    }));

  passport.use(new GoogleStrategy.OAuth2Strategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: configAuth.googleAuth.callbackURL,
    passReqToCallback: true,
  },
    (req, token, refreshToken, profile, done) => {
      passportCallback('google', req, token, refreshToken, profile, done);
    }));

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: isProd ? process.env.GITHUB_SECRET : process.env.GITHUB_SECRET_DEV,
    callbackURL: configAuth.githubAuth.callbackURL,
    passReqToCallback: true,
  },
    (req, token, refreshToken, profile, done) => {
      passportCallback('github', req, token, refreshToken, profile, done);
    }));
};
