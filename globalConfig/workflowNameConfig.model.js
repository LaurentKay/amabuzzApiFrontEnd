const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workflowNamesSchema = new Schema({
  name: {type: String}
});

workflowNamesSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
  }
});

module.exports = mongoose.model('workflowNames', workflowNamesSchema);
