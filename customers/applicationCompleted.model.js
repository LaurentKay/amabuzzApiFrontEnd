const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    afterCompletionMessage: { type: String },
    dateChanged : {type: Date, default: Date.now},
    userUUID: {type: String}    
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

module.exports = mongoose.model('applicationMessage', schema);