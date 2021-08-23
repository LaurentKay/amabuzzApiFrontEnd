const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    CustomerIDnumber: { type: String },
    CustomerContract: { type: String },
    dateSigned : {type: Date, default: Date.now},
    CustomerUUID: {type: String},
    IPAddress: { type: String }    
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

module.exports = mongoose.model('customerSignatures', schema);
