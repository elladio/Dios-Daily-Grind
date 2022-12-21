////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
	res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
	// encrypt password
	req.body.password = await bcrypt.hash(
		req.body.password,
		await bcrypt.genSalt(10)
	)
	// create the new user
	User.create(req.body, (err, user) => {
		//redirect to login page
		res.redirect("/user/login")
	})
})

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
	res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
	// get the data from the request body
	const { username, password } = req.body
	User.findOne({ username }, (err, user) => {
		// checking if user exists
		if (!user) {
			res.send("Sorry, user doesn't exist. Please head over to the Signup tab. ☺️")
		} else {
			//check if password matches
			const result = bcrypt.compareSync(password, user.password)
			if (result) {
				req.session.username = username
				req.session.loggedIn = true
				res.redirect("/coffees")
			} else {
				res.send("You have entered the wrong password. Please try again!")
			}
		}
	})
})

router.get("/logout", (req, res) => {
	// destroy session and redirect to main page
	req.session.destroy((err) => {
		res.redirect("/")
	})
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router