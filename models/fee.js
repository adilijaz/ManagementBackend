const Joi = require('Joi')
const mongoose = require('mongoose')

const feeSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
})

const Fee = mongoose.model('Fee', feeSchema)

exports.Fee = Fee