const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

const postSchema = new Schema({
    id: Number,
    title: String,
    date: {type: Date, default: Date.now()},
    dateCreated: { type: String, default: moment().format('lll')},
    text: String,
    characterId: String,
    worldId: String,
    type: {type: String, enum: ['Event', 'Post']},
    tagged_channels: [String],
    likes: Number,
    deletes: Number,
    report: Number,
    fork: Number
});

module.exports = mongoose.model('posts', postSchema);