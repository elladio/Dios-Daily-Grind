////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Coffee = require("../models/coffees")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// index route
router.get("/", (req, res) => {
	const id = req.params.id
	Coffee.find(id, (err, coffees) => {
		res.render("coffees/index.ejs", { coffees })
		
	})
})

//new route
router.get("/new", (req, res) => {
	res.render("coffees/new.ejs")
})

// create route
router.post("/", (req, res) => {
	req.body.expressoShot = req.body.expressoShot === "on" ? true : false
	req.body.iced = req.body.iced === "on" ? true : false
	Coffee.create(req.body, (err, coffee) => {
		res.redirect("/coffees")
	})
})

// edit route
router.get("/:id/edit", (req, res) => {
	const id = req.params.id
	Coffee.findById(id, (err, coffee) => {
		res.render("coffees/edit.ejs", { coffee })
			
	})
})

//update route
router.put("/:id", (req, res) => {
	const id = req.params.id
	req.body.expressoShot = req.body.expressoShot === "on" ? true : false
	req.body.iced = req.body.iced === "on" ? true : false
	Coffee.findByIdAndUpdate(id, req.body, { new: true }, (err, coffee) => {
		res.redirect("/coffees/")
	})
})

router.delete("/:id", (req, res) => {
	const id = req.params.id
	Coffee.findByIdAndRemove(id, (err, coffee) => {
		res.redirect("/coffees")
	})
})

// show route
router.get("/:id", (req, res) => {
	const id = req.params.id
	Coffee.findById(id, (err, coffee) => {
		res.render("coffees/show.ejs", { coffee })
	})
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router