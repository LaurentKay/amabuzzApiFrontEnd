const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poolSchema = new Schema({
  name: {type: String}
});

poolSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
  }
});

module.exports = mongoose.model('pools', poolSchema);
