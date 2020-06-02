// var mysql = require('mysql');
var db = require('../modules/database');


var continent_sql = "CREATE TABLE IF NOT EXISTS continent (unique_continent_id int(11) NOT NULL primary key UNIQUE AUTO_INCREMENT, continent_name VARCHAR(255) UNIQUE, continent_area_rank int(11), continent_area int(100))";
 
var country_sql = "CREATE TABLE IF NOT EXISTS country (unique_country_id int(11) primary key UNIQUE AUTO_INCREMENT, unique_continent_id VARCHAR(255), country_name VARCHAR(255) UNIQUE, country_area INT(100), country_area_rank INT(255), country_rank_id INT(100))";
 
var state_sql = "CREATE TABLE IF NOT EXISTS state (unique_state_id int(11) primary key UNIQUE AUTO_INCREMENT, unique_country_id VARCHAR(255), state_name VARCHAR(255) UNIQUE, state_area INT(100), state_area_rank INT(100), state_rank_id INT(100))";
 
var district_sql = "CREATE TABLE IF NOT EXISTS district (unique_district_id int(11) primary key UNIQUE AUTO_INCREMENT, unique_state_id VARCHAR(255), district_name VARCHAR(255) UNIQUE, district_area INT(100), district_area_rank INT(100), district_rank_id INT(100))";
 
// var signup_sql = "CREATE TABLE IF NOT EXISTS REGISTER (id INT(11) PRIMARY KEY UNIQUE AUTO_INCREMENT, fname VARCHAR(255) UNIQUE NOT NULL, lname VARCHAR(255), phoneno VARCHAR(20) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)"

var login_sql = "CREATE TABLE IF NOT EXISTS LOGIN(id INT(11) PRIMARY KEY UNIQUE AUTO_INCREMENT, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)"

var signin_sql = "CREATE TABLE IF NOT EXISTS SIGNIN(id INT(11) PRIMARY KEY UNIQUE AUTO_INCREMENT, email VARCHAR(255) UNIQUE, otp VARCHAR(255), phoneno VARCHAR(255))"

  
  db.query(signin_sql, function (err, result) {
    if (err) throw err;
    console.log("Sign In Table created");
  });

  // db.query(signup_sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Register Table created");
  // });

  db.query(login_sql, function(err,result) {
    if(err) throw err
    console.log("Login Table created")
  })

  db.query(continent_sql, function (err, result) {
    if (err) throw err;
    console.log("Continent Table created");
  });

  db.query(country_sql, function (err, result) {
    if (err) throw err;
    console.log("Country Table created");
  });

  db.query(state_sql, function (err, result) {
    if (err) throw err;
    console.log("State Table created");
  });

  db.query(district_sql, function (err, result) {
    if (err) throw err;
    console.log("Disrtict Table created");
  });



module.exports = db;