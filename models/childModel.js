// childModel.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    city: { type: String },
    street: { type: String },
    building: { type: String },
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: Number,
  fullName: { type: String, unique: true },
  age: { type: Number, required: true },
  level: { type: String, enum: ['PreKG', 'KG1', 'KG2'], required: true },
  address: addressSchema,
  email: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, minlength: 6, required: true },
});

module.exports = mongoose.model("Child", schema);
