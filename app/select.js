/**
 * Created by jmraymond on 2015-06-18.
 */
var Boomerang = require('./models/boomerang');

module.exports = {

    execute: function (request, user, done) {

        var selectedId = request.param('boomerangId');

        Boomerang.update(
            {'_id' : selectedId},
            { $set: {'users.responder' : user._id}},
            function(err, count, boomerang) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                return done(boomerang);
            }
        );

        //Boomerang.findOne({ '_id' : selectedId  }, function(err, boomerang) {
        //
        //    // if there are any errors, return the error
        //    if (err)
        //        return done(err);
        //
        //
        //    boomerang.users.responder = user._id;
        //    boomerang.update(function(err){
        //        if (err)
        //            throw err;
        //        return done(boomerang);
        //    });
        //});

    }
}