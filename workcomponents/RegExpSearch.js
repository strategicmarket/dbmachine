
// 2 solutions -- iterating through an array of objects looks for a match on a text string

var a = [ {name:"value1", action:"U"}, {name:"text2", action:"d"} ];

function getIndex( query, arr ) {
    var reg = RegExp( query );

    for ( var i = 0, l = arr.length; i < l; i++ ) {
        var item = arr[i];
        if ( reg.test(item.name) ) return i;
    }
    return false;
}

var index = getIndex( 'text', a );
//If you are looking for other ways to manipulate data, you may want to take a look at underscore.

//EDIT: I looked at your initial question a bit incorrectly, also took note of @pimvdb escaping recommendation. //This is probably more of what you want.

var a = [ {name:"value1", action:"U"}, {name:"text2", action:"d"} ];

function getIndex( query, arr ) {
    query = escape( query );
    for ( var i = 0, l = arr.length; i < l; i++ ) {
        var item = arr[i],
            reg = RegExp( escape(item.name) );
        if ( reg.test(query) ) return i;
    }
    return false;
}

var index = getIndex( 'I want to look up value1', a );