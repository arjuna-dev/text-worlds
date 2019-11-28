const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

const placeSchema = new Schema({
    id: Number,
    name: String,
    charactersId: [String],
    parentPlace: String,
    description: String,
    dateCreated: { type: String, default: moment().format('MMM Do YYYY') },
});

module.exports = mongoose.model('places', placeSchema);