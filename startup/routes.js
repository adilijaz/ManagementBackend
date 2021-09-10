// Packages
const express = require('express')
// Routes
const student = require('../routes/student')
const users = require('../routes/users')
const auth = require('../routes/auth')
// error
const error = require('../middlewares/error')

module.exports = function(app){
    app.use(express.json())
    app.use('/api/students', student)
    app.use('/api/users', users)
    app.use('/api/login', auth)
    app.use(error)
}
