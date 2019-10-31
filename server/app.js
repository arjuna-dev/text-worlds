const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const key = require('./key.js')
const app = express();

const character = require('./models/character');

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

const Jacob = new character ({
    name: "Jacob",
    age: 34,
})

Jacob.save();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// app.get('/', (req, res) => res.sendStatus(200))

app.listen(3000, () => {
    console.log('now listening for request on port 3000');
})


// app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.send("Hello there")
});