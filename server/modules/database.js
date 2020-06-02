
var mysql = require('mysql');

var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	// database: "local"
  });

  db.connect();

  console.log("connected")
  db.query("CREATE DATABASE IF NOT EXISTS apple_test", function(err,results){
    if(err) throw err;
    console.log("apple_test DB Created")
  });

db.query("USE apple_test",(err,results) => {
  if(err) throw err;
  console.log("Using Apple test")
});


module.exports = db;