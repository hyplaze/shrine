const express = require('express')
const mysql = require('mysql')

const app = express();

const db = mysql.createConnection({
	host	:'localhost',
	user	:'root',
	password: 'shrine123456',
	database: 'nodemysql'
})

db.connect((err) =>{
	if(err){
		throw err;
	}
	console.log('mySql Connected ...')
})

app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE IF NOT EXISTS nodemysql'
	db.query(sql, (err, result) =>{
		if(err) throw err;
		console.log(result);
		res.send('Database created ..')
	})
});

app.get('/createuserstable', (req, res) => {
	let sql = 'CREATE TABLE users (id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id))';
	db.query(sql, (err, result) => {
		if (err)
			throw err;	
		console.log(result);
		res.send('users table created...');
	});
});

app.listen('3000', () =>{
	console.log('Server started on port 3000');
})