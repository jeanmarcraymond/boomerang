/**
 * Created by jmraymond on 2015-06-15.
 */
var Boomerang = require('./models/boomerang');
var User = require('./models/user');

var boomerangUserCache = {

    cache : {},

    set : function(key, value){

        this.cache[key] = value;
    },

    get : function(key){
        return this.cache[key];
    }
}

module.exports = {

    execute : function(request, user, done){

        Boomerang.findOne({'users.responder' : user._id}, function (err, boomerang) {

            if (boomerang) {
                return done(boomerang);
            }

            var boomerangs = boomerangUserCache.get(user._id);

            if (boomerangs){
                var boomerang = boomerangs.pop();

                if (boomerang){
                    return done(boomerang);
                }
            }

            Boomerang.find({ 'answered' : {$ne: true}  }, function(err, boomerangs) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                boomerangUserCache.set(user._id, boomerangs);

                return done(boomerangs.pop());

            });
        });

    }

}