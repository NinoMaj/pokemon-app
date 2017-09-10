const isProd = process.env.NODE_ENV === 'production' ? true : false;

const callbackPath = isProd ?
  'https://pokemon48.herokuapp.com/' :
  'http://localhost:3000/';

module.exports = {
  twitterAuth: {
    consumerKey: isProd ? 'xxx' : 'xxx',
    callbackURL: `${callbackPath}auth/twitter/callback`,
  },

  googleAuth: {
    clientID: 'xxx',
    callbackURL: `${callbackPath}auth/google/callback`,
  },

  githubAuth: {
    clientID: isProd ? 'xxx' : 'xxx',
    callbackURL: `${callbackPath}auth/github/callback`,
  },
};
