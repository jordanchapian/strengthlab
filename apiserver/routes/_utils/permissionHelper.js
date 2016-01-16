var systemPermissions = require('../../models/systemPermission.const.json'),
		_ = require('underscore');

module.exports = {
	middleware:{
		auth:{
			ensureUser:function(req,res,next){
				if(!req.isAuthenticated())
		      return res.sendStatus(403);

		    next();
			},
			ensureSuperUser:function(req,res,next){
				if(!req.isAuthenticated() || req.user.systemPermission !== systemPermissions.superUser)
				    return res.sendStatus(403);

				next();
			}
		}
	},
	inline:{
		auth:{
			isSuperUser:function(user){
				return (user.systemPermission === systemPermissions.superUser);
			},
			isSameUser:function(user1,user2){
				return (String(user1._id) === String(user2._id));
			}
		}
	}
};