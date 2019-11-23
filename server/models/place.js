const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

const placeSchema = new Schema({
    user: String,
    id: Number,
    name: String,
    charactersId: [String],
    parentPlaceId: String,
    parentPlace: String,
    childPlaces: [String],
    description: String,
    dateCreated: { type: String, default: moment().format('MMM Do YYYY') },
});

module.exports = mongoose.model('places', placeSchema);