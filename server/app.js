var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var server   = require('http').Server(app);
var io       = require('socket.io')(server);

var passport = require('./strategies/userStrategy');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var mail = require('./routes/mail');
var messages = require('./routes/messages');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Catch direct requests and make sure the user can view this page
// app.use('/views/user.html', user);

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());
//socket.io connection
io.on('connection', function(socket){
  console.log('a user connected');
});
// Routes
app.use('/mail', mail);//add to app.js
app.use('/register', register);
app.use('/user', user);
app.use('/messages', messages);
app.use('/*', index);



// Mongo Connection //
//var mongoURI = 'mongodb://localhost:27017/mu';
var mongoURI = "mongodb://brill:nate2016@ds023064.mlab.com:23064/heroku_264mrkn9";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
   if(err) {
     console.log("MONGO ERROR: ", err);
   }
   res.sendStatus(500);
});

mongoDB.once('open', function(){
   console.log("Connected to Mongo, meow!");
});

// App Set //
app.set('port', (process.env.PORT || 5000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
