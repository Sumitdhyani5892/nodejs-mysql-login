const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const database = require("./configure/database");

const app = express();

// passport config
require("./configure/passport")(passport);

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

// hbs setup
app.set("view engine", "hbs");

// // express session
app.use(
	session({
		secret: "geeksforgeeks",
		saveUninitialized: true,
		resave: true,
	})
);

// initailize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// global  varible
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

// routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const defaultPORT = process.env.NODEJS_PORT;

app.listen(defaultPORT, () => {
	console.log(`server started running on port ${defaultPORT}`);
});
