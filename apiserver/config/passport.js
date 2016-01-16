var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) {
    process.nextTick(function() {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, {message:'user exists'});
            } else {
                var newUser = new User();
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }

        });    

    });

}));

passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) { 
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err)
                    return done(err);
                else if (!user || !user.validPassword(password)) 
                    return done(null, false, {error:true}); 
                else //success
                    return done(null, user);
            });

}));
