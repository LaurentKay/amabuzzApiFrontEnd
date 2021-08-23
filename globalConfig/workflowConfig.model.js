const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workflowObjectSchema = new Schema({
  name: {type: String},
  id: {type: String},
  pools: [{
    name: {type: String},
    id: {type: String}
  }]
});

const workflowSchema = new Schema({
  role: {type: String},
  id: {type: String},
  workflow: workflowObjectSchema
});

workflowSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
  }
});

module.exports = mongoose.model('workflow', workflowSchema);
