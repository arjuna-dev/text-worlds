const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    characters: Array,
    meta: {
        loggedIn: [Date],
        Disconnected: [Date],
        LoggedIntoWorld: [(String, Date)],
        DisconnectedFromWorld: [(String, Date)],
    }
});

module.exports = mongoose.model('users', userSchema);