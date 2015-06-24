/**
 * Created by jmraymond on 2015-06-18.
 */
var Boomerang = require('./models/boomerang');

module.exports = {

    execute: function (request, user, done) {

        var selectedId = request.param('boomerangId');

        Boomerang.findOne({'_id' : selectedId}, function (err, boomerang){

            return done(boomerang);
        });
    }
}