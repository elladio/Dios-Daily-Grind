require("dotenv").config() // Load ENV Variables
const PORT = process.env.PORT
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const coffeeRouter = require("./controllers/coffee")
const UserRouter = require('./controllers/user')
/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

app.use("/coffees", coffeeRouter)
app.use("/user", UserRouter)

app.get("/", (req, res) => {
	res.redirect("/coffees")
})
//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
app.listen(PORT, () => {
	console.log(`Party on: ${PORT}`)
})