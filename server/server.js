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
app.get("/login", async (req, res) => {
	try{
			var useracount = await user.findOne({"username": req.query.username, "password": req.query.password},
				(err, userEvent) => {});
			if(useracount != null){
				//generate cookie
				res.send("successfully connected cookie");
			}
	}
	catch{
		res.send(false);
	}
});


app.get("/addbox", async(req, res) => {
	try{
		var useracount = await user.findOne({"cookie": req.query.cookie});
		if(useracount != null){
			const box = new website({ 
				MasterUser : useracount.username,
				boxid : req.body.boxid,
				username : req.body.username,
				boxname : req.body.boxname,
				password : req.body.password,
				url : req.body.url,
				twoFA : req.body.twoFA
			});
			box.save();
			res.send(true);
		}
		else{
			res.send(false)
		}
	}
	catch{
		res.send(false);
	}
});


app.get("/adduser", async(req, res) => {
	try{
		var useracount = await user.findOne({"username": req.body.username},(err, userEvent) => {});
		if(useracount != null){
			res.send(false);
		}
		else{
			const newuser = new user(
				req.body
			);
		}
	}
	catch{
		res.send(false);
	}
});





db.once('open', () => console.log('Connected to Database'));

app.listen(3000, () => 
{
    console.log('Server listening on 3000'); 
});