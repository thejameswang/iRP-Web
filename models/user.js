const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let user_schema = new Schema({
  email: String,
  password: String,
  usertype: String,
});

module.exports = mongoose.model('User', user_schema);
