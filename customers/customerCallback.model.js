const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    RSAIDNumber: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    emailAddress:{type: String},
    mobileNumber:{type: String},
    otp: {type: Number},
    SMSSentID: {type: String},
    dateRequested: {type: Date, default: Date.now}
});

schema.set('toJSON', {
    virtuals:true,
    versionKey: false,
    transform: function(doc, ret){
        //
    }
});

module.exports = mongoose.model('callBacks', schema);