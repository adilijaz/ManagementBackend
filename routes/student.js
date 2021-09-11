const express = require("express");
const router = express.Router();
const { Student, validate, validateUpdate } = require("../models/students");
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
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check Users Is Exist
  let student = await Student.findOne({ email: req.body.email });
  if (student) return res.status(400).send("Student already registered.");
  student = new Student(
    _.pick(req.body, [
      "name",
      "fatherName",
      "email",
      "class",
      "fee",
      "phone",
      "address",
    ])
  );
  await student.save();
  res.status(200).send(`Student ${student.name} ${student.fatherName} Added`);
});

router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  // check valid student
  let student = await Student.findById(req.params.id);
  if (!student) return res.status(400).send("Student Not Found");
  // valid
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // update the student
  student = await Student.updateOne({_id:req.params.id},{$set: req.body});;
  if(!student) return res.status(404).send('The student record not Updated')
  res.status(200).send('Student Record Updated')
});

router.delete("/:id", async (req, res)=>{
  const student = await Student.findByIdAndRemove(req.params.id)
  if(!student) return res.status(404).send('Student not Found')
  res.status(200).send('Student Record Deleted')
})

module.exports = router;
