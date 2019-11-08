const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
//const key = require('./key.js')
const app = express();

const users = require('./models/user');
const character = require('./models/character');
const world = require('./models/world');

const cors = require('cors')

app.use(cors()) // not having cors enabled will cause an access control error

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

mongoose.connect('mongodb+srv://admin:admin@cluster0-zcwkp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// app.get('/', (req, res) => res.sendStatus(200))

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
})

// var test = users.find({name: "Paul"}, function(error, docs){
//     console.log(docs);
// })
// app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.send("Hello there")
});