//view created boomerangs

var Boomerang = require('./models/boomerang')

module.exports = {

    execute : function(request, user, done){

        Boomerang.find({ 'users.creator' :  user._id }, function(err, boomerangs) {

            // if there are any errors, return the error
            if (err)
                return done(err);

            return done(boomerangs);

        });
    }

}