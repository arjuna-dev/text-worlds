var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var worldSchema = new Schema({
  name:  String,
  creator: String,
  maxNumberOfCharacters: Number,
  minNumberOfCharacters: Number,
  dateCreated: { type: Date, default: Date.now },
  private: Boolean,
  year: Number,
  description: String,
  tags: [String],
  joinWithModeratorApproval: Boolean,
  maxAgeOfCharacters: Number,
  listOfUsers: [String], 
});

module.exports = mongoose.model('worlds', worldSchema);