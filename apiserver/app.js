var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyparser = require('body-parser'),
	session = require('express-session'),
	mongoStore = require('connect-mongo')(session),
	passport=require('passport'),
	session = require('express-session'),
	cookieParser = require('cookie-parser');

//set promise method for mongoose
mongoose.Promise = global.Promise;

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/strengthlab');

// Configure authentication routes and services
require('./config/passport.js');

// Middleware configurations
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
        secret: 'unprotecadminProtectedRouteunprotectedRouterrtedRouter',
        store: new mongoStore({mongooseConnection: mongoose.connection}),
        cookie:{maxAge: Number.MAX_SAFE_INTEGER},
        rolling: true,
        name:'mdr.session'
}));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

// require('./routine/administrators.js')();
app.use(require('cors')());
app.use('/api/', require('./routes/api/api.js'));

// view engine setup
module.exports = app;
