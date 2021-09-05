// Packages
const express = require('express')
// Routes
const student = require('../routes/student')


module.exports = function(app){
    app.use(express.json())
    app.use('/api/students', student)
}
