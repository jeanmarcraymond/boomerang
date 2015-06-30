var mongoose = require('mongoose');
var Parser = require("simple-text-parser");


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

boomerangSchema.methods.hashParsedDescription = function(description){

    var parser = new Parser();
    parser.addRule(/\#[\S]+/ig, function(description) {
        // Return the tag minus the `#` and surround with html tags
        return "<a class=\"tagLink\" href=\"/viewTag?tag="+description.substr(1) +"\">#" + description.substr(1) + "</a>";
    });

    return parser.parse(description);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Boomerang', boomerangSchema);
