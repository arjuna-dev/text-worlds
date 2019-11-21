var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
  user: String,
  name:  String,
  userId: String,
  worldId: String,
  role: String,
  gender: String,
  nickname:  String,
  story: String,
  age:  Number,
  occupation: String,
  hobbies: String,
  fobias: String,
  funFact: String,
  dateCreated: { type: String, default: moment().format('MMM Do YYYY')},
  tagged: [Date],
  // birthmarks: [String],
  onAdoption: Boolean
});

module.exports = mongoose.model('characters', characterSchema);