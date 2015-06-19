/**
 * Created by jmraymond on 2015-06-18.
 */
var Boomerang = require('./models/boomerang');

module.exports = {

    execute: function (request, user, done) {

        var search = request.param('search');

        Boomerang.find(
            { $text : { $search : search } },
            { score : { $meta: "textScore" } }
        )
            .sort({ score : { $meta : 'textScore' } })
            .exec(function(err, boomerangs) {
                return done(boomerangs);
            });


    }
}