//Import the mongoose module
var mongoose = require('mongoose');
const express = require('express');
const user = require('./models/user');
const website = require('./models/website');


//Set up default mongoose connection

const app = express();

mongoose.connect('mongodb://localhost/shrine_newdb',
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

//Get the default connection

//Bind connection to error event (to get notification of connection errors)
db.once('open', () => console.log('Connected to Database'));

app.listen(3000, () => 
{
    console.log('Server listening on 3000'); 
});