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

// index route
router.get("/", (req, res) => {
	const id = req.params.id
	Coffee.find(id, (err, coffees) => {
		res.render("coffees/index.ejs", { coffees })
		
	})
})
// Authorization Middleware
router.use((req, res, next) => {
	// else {
	// 	res.redirect("/user/login");
	// 	} 
	if (!req.session.loggedIn) {
		res.redirect("/user/login")
	}
	if (req.session.loggedIn) {
		next();
	} 
});

router.get("/", (req, res) => {
	Coffee.find(
		{
			username: req.session.username,
		},
		(err, coffees) => {
			res.render("coffees/index.ejs", { coffees })
		}
	)
})

router.get("/", (req, res) => {
	console.log(req.session)
	Coffee.find({})
		.then((coffees) => {
			res.render("coffees/index.ejs", { coffees })
		})
		.catch((err) => console.log(err))
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