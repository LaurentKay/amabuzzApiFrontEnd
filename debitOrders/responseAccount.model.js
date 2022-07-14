const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({ 
    any: Schema.Types.Mixed
 });

//const schema = new Schema({ any: Schema.Types.Mixed });


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
    }
});


module.exports = mongoose.model('ResponseAcount', schema);