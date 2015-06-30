/**
 * Created by jmraymond on 2015-06-19.
 */
var Boomerang = require('./models/boomerang');

module.exports = {

    execute: function (request, user, done) {

        var selectedId = request.param('boomerangId');
        var response = request.param('response');

        Boomerang.findOne({'_id' : selectedId}, function (err, boomerang){

            boomerang.users.responder = user._id;
            boomerang.response = response.trim();
            boomerang.answered = true;
            boomerang.save();

            return done();
        });

    }
}