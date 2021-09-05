// Packages
const express = require('express')
// Routes
const student = require('../routes/student')
const users = require('../routes/users')
const auth = require('../routes/auth')


module.exports = function(app){
    app.use(express.json())
    app.use('/api/students', student)
    app.use('/api/users', users)
    app.use('/api/login', auth)
}
