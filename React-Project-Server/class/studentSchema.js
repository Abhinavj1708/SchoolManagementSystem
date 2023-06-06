const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the student schema
const studentSchema = new Schema({
  Name: { type: String, required: true },
  FatherName: { type: String, required: true },
  RollNo: { type: String, required: true },
  Address: { type: String, required: true },
  Mail: { type: String, required: true },
  PhoneNo: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  created_on: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
