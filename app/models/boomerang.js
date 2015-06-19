var mongoose = require('mongoose');

// define the schema for our user model
var boomerangSchema = mongoose.Schema({

    description      : String,
    description_tags : [String],
    response         : String,
    response_tags    : [String],
    created          : Date,
    answered         : Boolean,

    users            : {
        creator: mongoose.Schema.ObjectId,
        responder: mongoose.Schema.ObjectId
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Boomerang', boomerangSchema);