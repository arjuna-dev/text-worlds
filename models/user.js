const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        defautl: Date.now
    },
    // meta: {
    //     loggedIn: [Date],
    //     Disconnected: [Date],
    //     LoggedIntoWorld: [(String, Date)],
    //     DisconnectedFromWorld: [(String, Date)],
    // }
});

module.exports = mongoose.model('users', userSchema);