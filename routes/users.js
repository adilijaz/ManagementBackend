const auth = require('../middlewares/auth')
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { User, validate } = require("../models/users");

// Get detail of login user
router.get('/loginUser', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select(['-password','-token','-_id','-__v']);
    res.send(user);
});
  
router.post("/addUser", async (req, res) => {
  // Validation Errors
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check Users Is Exist
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  //   Password Hash
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  //   Generate Token
  const token = user.generateAuthToken();
  user.token = token
  await user.save();
  res
    .header("Authorization", token)
    .send(_.pick(user, ["_id", "name", "email","token"]));
});

module.exports = router;
