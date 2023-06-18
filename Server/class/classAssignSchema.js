const mongoose = require("mongoose");

const classAssignSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
  },
  classesId: {
    type: [String],
    default: [],
  },
});

const ClassAssign = mongoose.model("ClassAssign", classAssignSchema);

module.exports = ClassAssign;
