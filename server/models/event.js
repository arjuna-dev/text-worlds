const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: Number,
    title: String,
    dateCreated: { type: Date, default: Date.now },
    text: String,
    characterId: String,
    worldId: String,
    type: {type: String, enum: ['World Narrator', 'Small Narrator', 'Me Speaking']},
    tagged_channels: [String],
    likes: Number,
    deletes: Number,
    report: Number,
    fork: Number
});

module.exports = mongoose.model('events', eventSchema);