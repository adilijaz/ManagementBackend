
// APP CREATED
const winston = require('winston');
const express = require('express')
const app = express()

require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()




// PORT SETUP
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.info(`LISTENING ON PORT ${port}`)        
})