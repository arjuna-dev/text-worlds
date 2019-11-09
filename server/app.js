const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
//const key = require('./key.js')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')

const getUser = require('./routes/sampleGetLoggedInUser')

app.use(cors())
dotenv.config();

//Middleware
app.use(express.json())
//Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/sampleget', getUser)

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: false
    }) 
)

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

app.listen(4000, () => {
    console.log('now listening for request on port 4000');
})


app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.send("Hello there")
});