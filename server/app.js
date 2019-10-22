const express = require('express');
const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

const key = require('./key.js')

const app = express();

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

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
})