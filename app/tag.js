/**
 * Created by jmraymond on 2015-06-05.
 */
 exports.parse = function (description) {

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

