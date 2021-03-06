var Boomerang = require('./models/boomerang');
var Tag = require('./tag.js');

module.exports = {

    execute : function(request, user, done){

        var newBoomerang = new Boomerang();
        var boomerangText = request.param('boomerang');
        var tags;

        newBoomerang.users.creator = user._id;
        newBoomerang.description = boomerangText.trim();
        newBoomerang.created = Date.now();
        newBoomerang.answered = false;

        tags = Tag.parse(newBoomerang.description);

        if (tags){
            newBoomerang.description_tags = tags;
        }
        // save the boomerang
        newBoomerang.save(function(err) {
            if (err)
                throw err;
            return done(newBoomerang);
        });
    }

}