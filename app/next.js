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

        Boomerang.findOne({'users.responder' : user._id, 'answered' : false}, function (err, boomerang) {

            if (boomerang) { // the user has one assigned already, show it
                return done(boomerang);
            }

            var boomerangs = boomerangUserCache.get(user._id);

            if (boomerangs){ // the user has initialed the cache previously

                var boomerang = boomerangs.pop();

                if (boomerang) {
                    return done(boomerang); // still one in the cache to pop
                }
            }

            // none cached, time to check in the db
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