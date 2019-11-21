const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const path = require('path');
//const key = require('./key.js')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')

const getUser = require('./routes/sampleGetLoggedInUser')

app.use(cors())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

dotenv.config();

//Middleware
app.use(express.json())
//Routes Middleware
app.use('/api/user', authRoute)

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: false
    }) 
)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

mongoose.connect(process.env.DB_CONNECT, { 
    useUnifiedTopology: true,    
    useNewUrlParser: true 
});

mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT, 4000)
