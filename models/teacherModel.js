// teacherModel.js
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String },
});

module.exports = mongoose.model("Teacher", teacherSchema);
