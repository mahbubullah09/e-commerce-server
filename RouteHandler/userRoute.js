const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Schemas/userSchema");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Sign up
router.post("/registration", async (req, res) => {
    console.log("Registration request:", req.body);
    const { name, email, password, role } = req.body;
  
    try {
      const newUser = new User({
        name,
        email,
        password,
        role,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error("Error during registration:", err); 
      res.status(500).json({ msg: "Server error", error: err.message }); // Provide more details
    }
  });
  
  // Log in
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User not found" }); 
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const payload = { user: { id: user.id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, user });
    } catch (err) {
      console.error("Error during login:", err); 
      res.status(500).json({ msg: 'Server error', error: err.message }); // Provide more details
    }
  });
  

module.exports = router;
