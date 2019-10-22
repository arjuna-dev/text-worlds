const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json())

// allow cross origin requests
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

mongoose.connect("mongodbcloudsetup", { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
})