const express = require('express');

const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const db = require('./models');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)

app.set('port', process.env.PORT || 3001);

// route middleware to make sure an user is logged in
function isLoggedIn(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/')
}

// required for passport
app.use(session({
  secret: process.env.PASSPORT_SECRET,  // session secret
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(compression());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const redirectObj = {
  successRedirect: '/',
  failureRedirect: '/',
}

// GOOGLE ROUTES
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))

app.get('/auth/google/callback', passport.authenticate('google', redirectObj));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
