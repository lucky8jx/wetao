const ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/logIn");
	}
};

export default ensureAuthenticated;