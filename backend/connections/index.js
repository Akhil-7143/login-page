const express = require("express");
const mongoose = require("mongoose");
const userData = require("./mongo.js");
const cors = require("cors");
const bcrypt=require("bcrypt")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const userDetails = { username, password };
  const hashedPassword=await bcrypt.hash(password,10)
  userDetails.password=hashedPassword

  try {
    const check = await userData.findOne({ username });
    if (check) {
      res.status(400);
      res.json("Username already exists");
      
    } else {
      res.status(201);
      await userData.insertMany([userDetails]);
      res.json("user logged in success");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500)
    res.json("Server Error");
  }
});

// Login Route
app.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userData.findOne({ username });
    const comparedPassword=await bcrypt.compare(password,user.password)
    if (user) {
      if (comparedPassword){
        res.json("success")
      }else{
        res.json("incorrect password")
      }
      
    } else {
      res.status(404);
      res.json("User does not exist");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500)
    res.json("Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
