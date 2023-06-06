import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use(express.urlencoded());

// const DB='mongodb+srv://ishitagupta:pPl05SaUrUa553xZ@cluster0.lggn2c8.mongodb.net/logindb?retryWrites=true&w=majority';
// mongoose.connect(DB).then(()=>{
//     console.log('connection successful');
// }).catch((err)=>console.log('no connection'));
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/reg");
  console.log("DB connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Confirmpassword: {
    type: String,
    required: true,
  },
});
app.use(cors());
const User = new mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email, password });
  if (!existingUser) {
    console.log("Invalid credentials!!"); 
    res.status(200).json({ message: "Invalid email or password" });
    return;
  }
  console.log("correct credentials");
  res.status(200).json({ message: "Login successful" });
});

app.get("/", (req, res) => {
  res.send("welcome to backend");
});

app.post("/register", async (req, res) => {
  const { name, email, password, Confirmpassword } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("Email already exists");
    res.status(200).json({ message: "Email already exists" });
    return;
  }
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.Confirmpassword = req.body.Confirmpassword;
  const doc = await user.save();
  console.log(doc);
  res.status(200).json({ message: "register successful" });
});
app.listen(8000, () => {
  console.log(" started port");
});
