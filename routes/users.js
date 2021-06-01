const express = require("express");
const router = express.Router();
const db = require("../configure/database");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/register", (req, res) => {
	res.render("register");
});

router.get("/login", (req, res) => {
	res.render("login");
});

//  registration handle
router.post("/register", (req, res) => {
	const { fullname, email, password, passwordconfirm } = req.body;
	console.log(req.body);

	let sql = "SELECT email FROM register WHERE email=?";
	db.query(sql, [email], async (err, results) => {
		if (err) throw err;

		if (!fullname || !email || !password || !passwordconfirm) {
			res.status(400).render("register", {
				message: "please fill all the details",
			});
		} else if (password !== passwordconfirm) {
			res.status(400).render("register", {
				message: "passwords do not match",
			});
		} else if (results.length > 0) {
			res.status(400).render("register", {
				message: "email already exist",
			});
		}
		console.log(results);
		// inserting form data into database
		let hashed = await bcrypt.hash(password, 8);
		console.log(hashed);
		const user = {
			Name: fullname,
			email: email,
			password: hashed,
		};
		db.query("INSERT INTO register SET ?", user, (err, result) => {
			if (err) {
				throw err;
			} else {
				console.log(result);

				req.flash("success_msg", "you are registered successfully");
				res.redirect("/users/login");
			}
		});
	});
});

// login post handle
router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/users/login",
		failureFlash: true,
	})(req, res, next);
});

// logouit handle
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "you are logged out");
	res.redirect("/users/login");
});

// show all users
router.get("/users", (req, res) => {
	let sql = "SELECT * FROM register";
	db.query(sql, (err, results) => {
		res.render("users", {
			userData: results,
		});
	});
});

module.exports = router;
