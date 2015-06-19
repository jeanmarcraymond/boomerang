/**
 * Created by jmraymond on 2015-06-18.
 */
var Boomerang = require('./models/boomerang');

module.exports = {

    execute: function (request, user, done) {

        Boomerang.findOne({'users.responder' : user._id}, function (err, boomerang) {

            boomerang.users.responder = undefined;
            boomerang.save();

            return done(boomerang);
        });

    }
}