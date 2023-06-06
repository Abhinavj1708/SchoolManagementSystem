const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  name: String,
  username: String,
  DOB: Date,
  email: String,
  password: String,
  fatherName: String,
  motherName: String,
  country: String
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;