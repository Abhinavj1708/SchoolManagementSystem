require("dotenv").config();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const form = require("./schema.js");

// mongoose.connect("mongodb://127.0.0.1:27017/form", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.mongodb_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connected");
});

// Define your API routes here
app.post("/register", async (req, res) => {
  // var new_user = new form(req.body);
  // console.log(new_user);
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

// app.post("/api/signin", (req, res) => {
//   // Handle sign-in logic and database operations here
// });

app.post("/login", async (req, res) => {
  try {
    let usernameOrEmail = req.body.email;
    let pass = req.body.password;
    // const { usernameOrEmail, pass } = req.body;
    // Retrieve the user data from MongoDB
    const user = await form.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    console.log(req.body);
    console.log(usernameOrEmail, pass);

    if (user) {
      const passwordMatch = await bcrypt.compare(pass, user.password);
      // Compare the provided password with the stored password
      if (passwordMatch) {
        // Passwords match, user is authenticated
        res
          .status(200)
          .json({ success: true, message: "Authentication successful", user });
        console.log("Authentication successful");
      } else {
        // Passwords do not match
        res.status(200).json({ success: false, message: "Invalid password" });
        console.log("Invalid password");
        return;
      }
    } else {
      // User data not found
      res.status(200).json({ success: false, message: "Invalid Username or id" });
      console.log("Invalid Username or id");
      return;
    }
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

// Start the server
app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
