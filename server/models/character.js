var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
  creator: String,
  name:  String,
  nickname:  String,
  age:  Number,
  occupation: String,
  hobbies: String,
  fobias: String,
  funFact: String,
  story: String,
  dateCreated: Date.now,
  tagged: [Date],
  birthmarks: [String],
});

module.exports = mongoose.model('characters', characterSchema);