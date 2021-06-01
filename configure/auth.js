module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash("error_msg", "please login to see that resource");
		res.redirect("/users/login");
	},
};
