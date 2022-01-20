const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema =Schema({
    id: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    RSAIDNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    emailAddress: {type: String, required: true },
    customerPassword:{type: String},
    pwdrestCode: {type: String},
    emailVerify: {type: String},
    emailVerified:{type: Boolean, default: false},
    createDate: {type : Date, default: Date.now }
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

module.exports = mongoose.model('CustomerLogin', schema);