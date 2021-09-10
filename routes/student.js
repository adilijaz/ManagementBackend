const express = require("express");
const router = express.Router();
const { Student, validate } = require("../models/students");
const _ = require("lodash");

router.get("/", async (req, res) => {
  const students = await Student.find();
  if (students.length === 0) {
    res.status(404).json({ Error: "No Students Found" });
  } else {
    res.status(200).json(students);
  }
});

router.post("/addStudent", async (req, res) => {
  console.log(req.body.email);
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check Users Is Exist
  let student = await Student.findOne({ email: req.body.email });
  if (student) return res.status(400).send("Student already registered.");
  student = new Student(_.pick(req.body, ["name","fatherName","email","class","fee","phone","address"]))
  await student.save()
  res.status(200).send(`Student ${student.name} ${student.fatherName} Added`)


});
module.exports = router;
