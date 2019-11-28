const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

const placeSchema = new Schema({
    id: Number,
    userId: Number,
    worldId: Number,
    parentPlaceId: Number,
    name: String,
    description: String,
    childPlaces: [String],
    dateCreated: { type: String, default: moment().format('MMM Do YYYY') },
});

module.exports = mongoose.model('places', placeSchema);