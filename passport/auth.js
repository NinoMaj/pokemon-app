const isProd = process.env.NODE_ENV === 'production' ? true : false;

const callbackPath = isProd ?
  'https://pokemon48.herokuapp.com/' :
  'http://localhost:3000/';

module.exports = {
  twitterAuth: {
    consumerKey: isProd ? '1OfRIUy70ChhM0zwhd59oDGsO' : 'pDgW2qdfYmE7siYxboN5esjsX',
    callbackURL: `${callbackPath}auth/twitter/callback`,
  },

  googleAuth: {
    clientID: '566331442205-7uip1rjq3kb12kcjd3r458qbjbv3tri4.apps.googleusercontent.com',
    callbackURL: `${callbackPath}auth/google/callback`,
  },

  githubAuth: {
    clientID: isProd ? 'c44d960c8b1e4fa06dbf' : '268f2bef895718508c27',
    callbackURL: `${callbackPath}auth/github/callback`,
  },
};
