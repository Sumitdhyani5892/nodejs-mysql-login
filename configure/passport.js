const LocalStrategy = require("passport-local").Strategy;
const db = require("./database");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true,
			},
			(req, email, password, done) => {
				console.log(req.body);

				//  check if email is registered or not
				db.query(
					"SELECT * FROM register WHERE email =?",
					[email],
					(err, rows) => {
						if (err) return done(err);
						if (!rows.length)
							return done(null, false, { message: "email is not registered" });

						//  if the user is found but the password is wrong
						if (!bcrypt.compareSync(password, rows[0].password))
							return done(null, false, { message: "oops..! wrong password" });

						// if user is found return successful user
						return done(null, rows[0]);
					}
				);
			}
		)
	);

	// serialize user for the session
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	//used to deserialize the user
	passport.deserializeUser((id, done) => {
		db.query("SELECT * FROM register WHERE id=?", [id], (err, rows) => {
			console.log(rows);
			console.log(err);
			done(err, rows[0]);
		});
	});
};
