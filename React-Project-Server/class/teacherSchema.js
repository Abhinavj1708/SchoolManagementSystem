const mongoose = require("mongoose");
const { Schema } = mongoose;
const teacherSchema = new Schema({
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  Address: { type: String, required: true },
  Mail: { type: String, required: true },
  PhoneNo: { type: String, required: true },
  qualification: { type: String, required: true },
  salary: { type: Number, required: true },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  created_on: { type: Date, default: Date.now },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
