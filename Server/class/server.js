require("dotenv").config();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const form = require("./schema.js");
const studentForm = require("./studentSchema.js");
const teacherForm = require("./teacherSchema.js");
const classAssign = require("./classAssignSchema.js");

const app = express();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
app.use(express.json());
app.use(cookie());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.mongodb_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connected");
});

app.post("/registerStudent", async (req, res) => {
  try {
    let mail = req.body.Mail;
    const existingUser = await studentForm.findOne({ Mail: mail });
    if (existingUser) {
      console.log("Email already exists");
      res.status(200).json({ message: "Email already exists" });
      return;
    }
    const studentData = req.body;
    const newStudent = new studentForm(studentData);
    await newStudent.save();
    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Failed to register student:", error);
    res.status(500).json({ error: "Failed to register student" });
  }
});

app.post("/registerTeacher", async (req, res) => {
  try {
    let mail = req.body.Mail;
    const existingUser = await teacherForm.findOne({ Mail: mail });
    if (existingUser) {
      console.log("Email already exists");
      res.status(200).json({ message: "Email already exists" });
      return;
    } else {
      const teacherData = req.body;
      const newTeacher = new teacherForm(teacherData);
      await newTeacher.save();
      res.status(200).json({ message: "Registered successfully" });
    }
  } catch (error) {
    console.error("Failed to register teacher:", error);
    res.status(500).json({ error: "Failed to register teacher" });
  }
});

app.post("/viewStudent", async (req, res) => {
  try {
    const students = await studentForm.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Failed to fetch students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/viewTeacher", async (req, res) => {
  try {
    const teachers = await teacherForm.find({ is_deleted: false });
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.email;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  let user = new form();
  user.name = req.body.name;
  user.username = req.body.username;
  user.DOB = req.body.DOB;
  user.email = req.body.email;
  user.password = hashedPassword;
  user.fatherName = req.body.fatherName;
  user.motherName = req.body.motherName;
  user.country = req.body.country;
  const existingUser = await form.findOne({ email });
  if (existingUser) {
    console.log("Email already exists");
    res.status(200).json({ message: "Email already exists" });
    return;
  }
  
  user
    .save()
    .then(() => {
      console.log("Registered successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/check", async (req, res) => {
  if (!req.cookies) {
    return res.json({ status: "invalid" });
  }

  const token = req.cookies.access_token;
  if (!token) {
    return res.json({ status: "invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.MY_KEY);
    req.email = decoded.email;
  } catch (err) {
    console.log(err);
    console.log("Middleware auth error");
  }
  const user = await form.findOne({ email: req.email });

  if (!user) {
    res.json({ status: "invalid" });
  } else {
    res.json({ status: "ok" });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successful" });
});

app.post("/login", async (req, res) => {
  try {
    let usernameOrEmail = req.body.email;
    let pass = req.body.password;
    const user = await form.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ email: usernameOrEmail }, process.env.MY_KEY);

        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.SECURE,
          maxAge: 20 * 60 * 1000,
        });

        res
          .status(200)
          .send({ status: "ok", message: "Authentication successful" });
      } else {
        res.status(200).json({ success: false, message: "Invalid password" });
        console.log("Invalid password");
        return;
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "Invalid Username or id" });
      console.log("Invalid Username or id");
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.post("/deleteRecord", async (req, res) => {
  const teacherId = req.body.teacherId;

  try {
    const result = await teacherForm.findByIdAndUpdate(
      teacherId,
      { $set: { is_deleted: true } },
      { new: true }
    );

    if (result) {
      res.json({ message: "Record marked as deleted successfully" });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    console.log("Error deleting record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/teacher", async (req, res) => {
  const teacherId = req.body.id;
  const teacher = await teacherForm.findById(teacherId);
  res.status(200).json(teacher);
});

app.post("/modifyTeacher", async (req, res) => {
  const teacherData = req.body;
  const teacherId = teacherData._id;
  try {
    const existingTeacher = await teacherForm.findOne({
      Mail: teacherData.Mail,
      _id: { $ne: teacherId },
    });

    if (existingTeacher) {
      res.json({ message: "Email already exists" });
      return;
    }
    const updatedTeacher = await teacherForm.findByIdAndUpdate(
      teacherId,
      teacherData,
      { new: true }
    );

    if (updatedTeacher) {
      res.status(200).json({ message: "Updated successfully" });
    } else {
      res.status(404).json({ error: "Teacher not found" });
    }
  } catch (error) {
    console.log("Error updating teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/teacherInfo", async (req, res) => {
  try {
    const teachers = await classAssign.find({});
    const teacherIds = teachers.map((teacher) => teacher.teacherId);
    const teacherInfo = await teacherForm.find({ _id: { $in: teacherIds } });

    const response = teacherInfo.map((teacher) => {
      return {
        name: teacher.Name,
        classCount: teachers.find((t) => t.teacherId === teacher._id.toString())
          .classesId.length,
      };
    });
    res.json(response);
  } catch (error) {
    console.error("Failed to fetch teacher information:", error);
    res.status(500).json({ error: "Failed to fetch teacher information" });
  }
});

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
