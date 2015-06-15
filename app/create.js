var Boomerang = require('./models/boomerang')

module.exports = {

    execute : function(request, user, done){

        var newBoomerang = new Boomerang();
        var boomerangText = request.param('boomerang');

        newBoomerang.users.creator = user._id;
        newBoomerang.description = boomerangText;
        newBoomerang.created = Date.now();

        // save the boomerang
        newBoomerang.save(function(err) {
            if (err)
                throw err;
            return done(newBoomerang);
        });
    }

}