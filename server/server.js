//Import the mongoose module
var mongoose = require('mongoose');
const express = require('express');
const cors=require('cors');
const user = require('./models/user');
const website = require('./models/website');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
//Set up default mongoose connection

const app = express();
app.use(cors());

//online remote database: mlab
const db_url = 'mongodb+srv://randygu:water123@shrinedb.jedf9.mongodb.net/shrineDB?retryWrites=true&w=majority';
const uri = process.env.MONGODB_URI || db_url;
mongoose.connect(uri,
  {
    useNewUrlParser: true,
  }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', routes); //import routes from the routes file

app.listen(3000, () =>
{
    console.log('Server listening on 3000');
});
