const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    applicationReference: {type: String},
    telephoneNumbers: {type: Boolean},
    employers: {type: Boolean},
    addresses: {type: Boolean},
    accounts: {type: Boolean},    
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

module.exports = mongoose.model('compuscanAnswerSaves', schema);
