var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var cors= require("cors");
const nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var session = require('express-session');
var expressFlash = require('express-flash');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore({}, db);

const bcrypt = require('bcrypt');
const saltRounds = 10;
var md5 = require('md5');

var index = require('./routes/index');
var users = require('./routes/users');
var continents = require('./routes/continents');
var countries = require('./routes/countries');
var states = require('./routes/states');
var districts = require('./routes/districts');
var db = require('./modules/database');
var tables = require('./modules/tables');
 
var app = express();
 
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views','views');

// production mode
// if(process.env.NODE_ENV === 'production') {  
  // app.use(express.static(path.join(__dirname, '/home/obscst')));
  // app.get('*', (req, res) => {    
  //   res.sendfile(path.join(__dirname = '/home/obscst/public_html/index.html'));  
  // })
  // };
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));
var sessionMiddleware = session({
  secret: 'sessionscrete',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie:{maxAge: 365 * 24 * 60 * 60 * 1000}
});
app.use(sessionMiddleware);

// create reusable transporter object using the default SMTP transport--from mailid
let smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'snth.ammu@gmail.com',
      pass : 'ammu@584'
  }
});
 
 
// app.post('/login', (req,res,next) => {
//   console.log(req.body)
//   var passDecrypt = md5(req.body.password);
//   db.query('SELECT  email,password FROM register where email = "'+req.body.email+'" AND password = "'+passDecrypt+'"', function(err,data){
//     if(err){
//       console.log(err)
//     } 
//     else {
//       db.query('INSERT INTO login (email,password) values("'+req.body.email+'","'+req.body.password+'")', function(err,data){
//         if(err){
//           console.log({success:false,message:"Login Failed"});
//         }
//         else{
//           console.log({success:true, message:"Logged iin successfully"});
//         }
//       })
//     }

//   })
// })

app.use('/', index);
app.use('/users', users);
app.use('/object/getcontinents', continents);
// app.use('/object/getcontinents/continent/:id',continents);
app.use('/object/getcountries', countries);
app.use('/object/getstates', states);
app.use('/object/getdistricts', districts);

app.use(passport.initialize());
app.use(passport.session());
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(8080);



 

