require("dotenv").config();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const form = require("./schema.js");
const studentForm = require("./studentSchema.js");
const teacherForm = require("./teacherSchema.js");

const app = express();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
app.use(express.json());
app.use(cookie());
// const redis = require("redis");
// const connectRedis = require("connect-redis");
// const session = require("express-session");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const RedisStore = connectRedis(session);

// const redisClient = redis.createClient({
//   host: "localhost",
//   port: 6379
// });

// redisClient.on("connect", function (err) {
//   console.log("Connected Reddis");
// });

// const sessionStore = new RedisStore({ client: redisClient });

// const RedisStore = connectRedis(session);

// app.use(
//   session({
//     store: sessionStore,
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // Set to true if using HTTPS
//       httpOnly: true,
//       maxAge: 86400000, // Session expiration time (in milliseconds)
//     },
//   })
// );

// app.use(express.json());

// const users = [
//   {
//     id: 1,
//     email: "test@example.com",
//     password: "$2b$10$G8.FnHQZb55V68I2kV3AaeumjKncVDoVnhJXggH7q9TGNxrN49jjW", // Password: "password"
//   },
// ];

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
      console.log(req.body);
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
    // console.log(students);
    res.status(200).json(students);
  } catch (error) {
    console.error("Failed to fetch students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/viewTeacher", async (req, res) => {
  try {
    const teachers = await teacherForm.find({});
    // console.log(teachers);
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
      console.log("done");
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

// Logout endpoint
app.get("/logout", (req, res) => {
  console.log("hi");
  // Destroy the session
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error("Error destroying session:", err);
  //     return res.status(500).json({ message: "Internal Server Error" });
  //   }
  //   // Redirect or send a response indicating successful logout
  //   res.status(200).json({ message: "Logout successful" });
  //   res.redirect("/");
  // });
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
    // console.log(req.body);
    // console.log(usernameOrEmail, pass);
    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if (passwordMatch) {
        // console.log("Authentication successful");
        const token = jwt.sign({ email: usernameOrEmail }, process.env.MY_KEY);

        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.SECURE,
          maxAge: 5 * 60 * 1000,
        });

        res
          .status(200)
          .send({ status: "ok", message: "Authentication successful" });
      } else {
        // Passwords do not match
        res.status(200).json({ success: false, message: "Invalid password" });
        console.log("Invalid password");
        return;
      }
    } else {
      // User data not found
      res
        .status(200)
        .json({ success: false, message: "Invalid Username or id" });
      console.log("Invalid Username or id");
      return;
    }
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.post("/records", async (req, res) => {
  const recordId = req.body.data;
  console.log("wrubfeirhv ");
  console.log(recordId);

  try {
    // Find the record by its ID and remove it
    const result = await teacherForm.findByIdAndRemove(recordId);

    if (result) {
      res.json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    console.log("Error deleting record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
