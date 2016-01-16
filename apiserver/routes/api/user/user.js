var User = require('../../../models/user.js'),
    permissionHelper = require('../../_utils/permissionHelper'),
    BLACKLIST_USER = require('./BLACKLIST_USER.json'),
    _ = require('underscore');

module.exports = function(api){
	(function(){

      api.get('/user',
      permissionHelper.middleware.auth.ensureUser,
      function(req, res){
      		console.log('hit')
          //determine if user has requested only their record
          if(Boolean(req.query.me) === true)send_user(req, res);

          //if not, send them what belongs to them.
          else if(permissionHelper.inline.auth.isSuperUser(req.user)) send_all(req,res);
          else send_user(req, res);

      });

      var selectQuery = _.extend({}, _.reduce(BLACKLIST_USER, function(o, omitKey){ o[omitKey] = 0; return o; }, {}));
      function send_all(req,res){
          User.find().select(selectQuery).exec()
          .then(function(list){
              res.send(list);
          },
          function(err){
              res.status(500).send([]);
          });
      }

      function send_user(req,res){
          res.send(_.omit(req.user.toObject(), BLACKLIST_USER));
      }

  })();
}