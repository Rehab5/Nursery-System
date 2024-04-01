// classModel.js
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: Number,
  name: { type: String, unique: true, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  children: [{ type: Number, ref: 'Child' }],
});

module.exports = mongoose.model("Class", schema);
