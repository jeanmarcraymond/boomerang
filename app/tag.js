/**
 * Created by jmraymond on 2015-06-05.
 */

var Boomerang = require('./models/boomerang');

module.exports = {

    getTagged: function (request, user, done) {

        var tag = request.param('tag');

        Boomerang.find({ 'description_tags' : tag  }, function(err, boomerangs) {

            // if there are any errors, return the error
            if (err)
                return done(err);



            return done(boomerangs);

        });


    },

    parse: function (description) {

        var tagsplit = description.split("#");
        var tags = new Array();

        if (tagsplit.length == 1 ){
            if (description.indexOf("#") == -1){
                return;
            }
        }

        for (var i = 1; i < tagsplit.length; i++) {
            var tag = tagsplit[i].split(' ')[0];
            tags.push(tag);
        }

        return tags;
    }
}

