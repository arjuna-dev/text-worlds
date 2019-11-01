const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    id: Number,
    name: String,
    parentPlace: String,
    description: String,
});

module.exports = mongoose.model('places', placeSchema);