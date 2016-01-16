var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var systemPermission = require('./systemPermission.const.json');
var _ = require('underscore');

var userSchema   = new Schema({ 
    //////////////////////
    //user provided credentials
    //////////////////////

	local            : {

        email        : {type:String, required:true},
        password     : {type:String, required:true}

    },


    ////////////////////
    //user defined rules
    ////////////////////
    station:[Schema.Types.ObjectId],
    activeStation:Schema.Types.ObjectId,
    setting:{

    },

    //////////////////
    //book keeping
    //////////////////
    dateCreated:{type:Date, required:true, default:Date.now},
    systemPermission:{type:String, required:true, default:systemPermission.user}
});

userSchema.methods.updateWhitelistedData = function(updates, cb){
    var whitelist = ['activeStation'],
        self = this;

    _.each(whitelist, function(f){
        if(updates[f]){
            self[f] = updates[f];
        }
    });

    self.save(function(err, result){
        if(err)cb(500);
        else cb(null, result);
    });
};

userSchema.methods.addStation = function(stationid, cb){
    //determine if we have valid input
    if(!stationid || !cb)return cb(400, null);

    //ensure id is string
    stationid = stationid.toString();

    //determine if the station already exists
    var stationFound = _.find(this.station, function(e){return e == stationid;});

    //if already exists, just bail positively
    if(stationFound)return cb(null,this);

    //if it doesnt, push into collection
    this.station.push(stationid);

    //save changes
    this.save(function(err, result){
        if(err)return cb(500, null);
        else cb(null, result);
    });
};
userSchema.methods.removeStation = function(stationid, cb){
    //determine if we have valid input
    if(!stationid || !cb)return cb(400, null);

    //ensure id is string
    stationid = stationid.toString();

    //remove the user if it exists
    this.station = _.filter(this.station, function(e){return e != stationid;});

    //save changes
    this.save(function(err, result){
        if(err)return cb(500, null);
        else cb(null, result);
    });
};
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', userSchema);
