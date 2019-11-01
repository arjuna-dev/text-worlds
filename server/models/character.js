var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
  user: String,
  name:  String,
  nickname:  String,
  age:  Number,
  occupation: String,
  hobbies: String,
  fobias: String,
  funFact: String,
  story: String,
  dateCreated: { type: Date, default: Date.now },
  tagged: [Date],
  // birthmarks: [String],
  onAdoption: Boolean
});

module.exports = mongoose.model('characters', characterSchema);