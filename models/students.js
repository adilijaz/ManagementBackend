const Joi = require('joi')
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:40,
    },
    fatherName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:40,
    },
    email:{
        type:String,
        required:true,
        minlength:1,
        maxlength:255,
        unique:true,
    },
    class:{
        type:Number,
        required:true,
        minlength:9,
        maxlength:12,
    },
    fee:{
        type:Number,
        required:true,
        minlength:4000,
        maxlength:10000,
    },
    address:{
        type:String,
        required:true,
        minlength:10,
        maxlength:255,
    },
    phone:{
        type:String,
        require:true,
        maxlength:15,
        minlength:4,
    }

})

const Student = mongoose.model('Student', studentSchema)

function validateStudent(student){
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        fatherName:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(50).required().email(),
        class:Joi.number().min(9).max(12).required(),
        fee:Joi.number().min(4000).max(10000).required(),
        address:Joi.string().min(1).max(255).required(),
        phone:Joi.string().min(1).max(255).required(),
    })
    return schema.validate(student)
}

exports.Student = Student
exports.validate = validateStudent