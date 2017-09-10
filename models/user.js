const mongoose = require('mongoose');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: String,
  userName: String,
  fullName: String,
  country: String,
  city: String,
  state: String,
  dateCreated: { type: Date, default: Date.now },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    displayName: String,
  },
  github: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
