var express = require('express'),
    _ = require('underscore'),
    api = express.Router();

 /*=========================================
 =            Common Parameters            =
 =========================================*/
 
 /*=====  End of Common Parameters  ======*/
 
 

//pass on to the next layer
require('./auth/auth.js')(api);
require('./user/user.js')(api);

//expose the entry point
module.exports = api;