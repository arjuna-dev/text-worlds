const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    characters: Array,
    worlds: Array,
    meta: {
        loggedIn: [Date],
        Disconnected: [Date],
        LoggedIntoWorld: [(String, Date)],
        DisconnectedFromWorld: [(String, Date)],
    }
});

module.exports = mongoose.model('users', userSchema);