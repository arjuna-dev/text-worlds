const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const key = require('./key.js')
const app = express();

const user = require('./models/user');
const character = require('./models/character');
const world = require('./models/world');

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

mongoose.connect(key.key, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

const Arjuna = new user ({
    name: "Arjuna",
    email: "arjuna1@pm.me",
})

const Notsyrius = new world ({
    name: "Notsyrius",
    year: 3334,
    description: "The Kali yoga is rampant. Long gone are the days of peace and good maners. Materialism is the philosophy of the day. Men and women, onld and young forget themselves in the world of matter, living for their sensual gratifications.",
})

const Jacob = new character ({
    name: "Jacob",
    story: "I was born in an upper class family. Trained in the arts of diplomacy and arts alike. I never cared for it all. I escaped my life of luxory suspecting I could find something more subtle, more beautiful. I've been a beggar, a martial arts student, a nobody. Now I tell stories on the streets and people sometimes listen.",
    age: 34,
})

Jacob.save();
Arjuna.save();
Notsyrius.save();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// app.get('/', (req, res) => res.sendStatus(200))

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
})


// app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.send("Hello there")
});