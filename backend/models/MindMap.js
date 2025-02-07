const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  parent: { type: String }  // Optional: id of the parent node
});

const MindMapSchema = new Schema({
  title: { type: String, required: true },
  nodes: [NodeSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MindMap', MindMapSchema);
