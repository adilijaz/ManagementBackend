
// APP CREATED
const express = require('express')
const app = express()


require('./startup/routes')(app)

// PORT SETUP
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`LISTENING ON PORT ${port}`)        
})