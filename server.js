
const express = require('express') 
require("dotenv").config(); // Load env variables
const morgan = require("morgan"); // nice logger for our request
const methodOverride = require("method-override"); // allows us to override post request from our ejs/forms
const PORT = process.env.PORT

const CoffeeRouter = require("./controllers/coffee");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
//////////////////////////////////////////////
//////// Middlewares
///////////////////////////////////////////////

app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.MONGO }),
        saveUninitialized: true,
        resave: false,
    })
);

// app.get('/', homeRoutes)
// app.get('/store', storeRoutes)
// app.get('/user', userRoutes)
app.use("/coffee", CoffeeRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(PORT, () => console.log(`Were poppin at: ${PORT}`));