const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    vendorID: {type:String},
    apiVersion: {type:String},
    questions : [{
        _id: {type:String},
        questionType: {type:String},
        question: {type:String}
    }]
});

schema.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized


    }
});

module.exports = mongoose.model('customerincorrectanswers', schema);
