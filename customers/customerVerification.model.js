const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    id: Joi.string(),
    telephoneNumbers:Joi.array(),
    addresses:Joi.array(),
    employers: Joi.array(),
    accounts:Joi.array()
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

module.exports = mongoose.model('Customerincorrectanswers', schema);
