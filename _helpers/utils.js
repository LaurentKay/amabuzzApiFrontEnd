const Hashids = require('hashids')
const hashids = new Hashids()

module.exports = generateHashIDs;

function generateHashIDs(hashIt)
{
    
	var ids = new Hashids(hashIt);

    var id = ids.encode(1, 2, 3, 4);
    
    var hashed = ids.decode(id);

    
    return id;
}

/*
import Hashids from "https://cdn.skypack.dev/hashids@2.2.8";
var ids = new Hashids("610a96cd72cf2a5fe88c2f98");

var id = ids.encode(1, 2, 3, 4);
var numbers = ids.decode(id);

console.log('id: ', id);
console.log('numbers: ', numbers);
*/