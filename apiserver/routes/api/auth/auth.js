var _ = require('underscore'),
	passport = require('passport');


module.exports = function(api){
	api.route('/auth/login')
	.post(passport.authenticate('local-login'), 
		function(req,res){
			if(req.isAuthenticated())
				res.json(req.user);
			else 
				res.sendStatus(401);
		});

	api.route('/auth/logout')
	.post(function(req, res){
	  req.logout();
	  res.sendStatus(200);
	});

	api.route('/auth/signup')
	.post(passport.authenticate('local-signup'), 
	function(req,res){
		if(req.isAuthenticated())
			res.json(req.user);
		else 
			res.sendStatus(401);
	});

};