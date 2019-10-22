var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var world = new Schema({
  name:  String,
  creator: String,
  maxNumberOfCharacters: Number,
  minNumberOfCharacters: Number,
  dateCreated: Date.now,
  tagged: [Date],
  private: Boolean,
  year: Number,
  description: String,
  tags: [String],
  joinWithModeratorApproval: Boolean,
  maxAgeOfCharacters: Number,
  listOfUsers: [String],
});