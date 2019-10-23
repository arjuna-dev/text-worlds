const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    dateCreated: Date.now(),
    text: String,
    author: String,
    type: {type: String, enum: ['World Narrator', 'Small Narrator', 'Character', 'Mixed']},
    tagged_channels: [String],
    likes: Number,
    deletes: Number,
    report: Number,
    fork: Number
});

module.exports = mongoose.model('posts', postSchema);