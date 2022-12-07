require("dotenv").config()  
const express = require('express') 
const morgan = require('morgan') 
const methodOverride = require('method-override') 
const mongoose = require('mongoose')


//create app w/ express
const app = express()


// establish connection 
mongoose.connect(process.env.MONGO)

// connection event alert
mongoose.connection
.on('open', () => console.log("Connected to mongo!"))
.on('close', () => console.log("Disconnected to mongo!"))
.on('error', (error) => console.log(error))

//register my middleware
app.use(morgan('dev'))
app.use('/static', express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// ROUTES AND ROUTERS
app.get('/', (req,res) => {
    res.send("<h1>SERVER IS WORKING</h1>")
})

//START THE SERVER 
const PORT = process.env.PORT || 2200
app.listen(PORT, () => console.log(`port ${PORT} is poppin!` ))