var mongoose = require('mongoose');

// define the schema for our user model
var boomerangSchema = mongoose.Schema({

    description      : String,
    description_tags : [],
    response         : String,
    response_tags    : [],
    created          : Date,

    users            : {
        creator: [mongoose.Schema.ObjectId],
        responder: [mongoose.Schema.ObjectId]
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Boomerang', boomerangSchema);