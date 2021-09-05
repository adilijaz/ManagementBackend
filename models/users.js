const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:5,
        maxlength:40,
    },
    email:{
        type:String,
        require:true,
        minlength:5,
        maxlength:255,
        unique: true,
    },
    password:{
        type:String,
        require:true,
        minlength:5,
        maxlength:1024,
    },
    token:{
        type:String,
        require:false,
    },
   
})
userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User',userSchema )



function validateUser(user){
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required(),
    })
    return schema.validate(user)
}

exports.User = User
exports.validate = validateUser