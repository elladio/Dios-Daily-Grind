////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Coffee = require("../models/coffee")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////



// // index route
// router.get("/", (req, res) => {
// 		res.render("loading.ejs")
		
// 	})

// index route
router.get("/", (req, res) => {
	const id = req.params.id
	Coffee.find(id, (err, coffee) => {
		res.render("cofees/index.ejs", { coffee })
		
	})
})

//new route
router.get("/new", (req, res) => {
	res.render("cofees/new.ejs")
})

// create route
router.post("/", (req, res) => {
	req.body.expressoShot = req.body.expressoShot === "on" ? true : false
    req.body.iced = req.body.iced === "on" ? true : false
	Coffee.create(req.body, (err, sneaker) => {
		res.redirect("/coffees")
	})
})

// edit route
router.get("/:id/edit", (req, res) => {
	const id = req.params.id
	Coffee.findById(id, (err, sneaker) => {
		res.render("cofee/edit.ejs", { coffee })
			
	})
})

//update route
router.put("/:id", (req, res) => {
	const id = req.params.id
	req.body.expressoShot = req.body.expressoShot === "on" ? true : false
    req.body.iced = req.body.expressoShot === "on" ? true : false
	Coffee.findByIdAndUpdate(id, req.body, { new: true }, (err, coffee) => {
		res.redirect("/coffee")
	})
})

router.delete("/:id", (req, res) => {
	const id = req.params.id
	Coffee.findByIdAndRemove(id, (err, coffee) => {
		res.redirect("/coffee")
	})
})

// show route
router.get("/:id", (req, res) => {
	const id = req.params.id
	Coffee.findById(id, (err, sneaker) => {
		res.render("cofees/show.ejs", { coffee })
	})
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router