import express from 'express';
import passport from 'passport';

import User from '../models/user';
import ensureAuthenticated from '../common/ensureAuth';

const router = express.Router();

router.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.errors = req.flash("error");
	next();
});

router.get("/", (req, res, next) => {
	res.render("index");
});

router.get("/logIn", (req, res, next) => {
	res.render("logIn");
});

router.get("/signUp", (req, res, next) => {
	res.render("signUp");
});
router.post("/signUp", (req, res, next) => {
	console.log(req.body);
	let username = req.body.username;
	let password = req.body.password;
	User.findOne({ username: username }, (err, user) => {
		if (err) { return next(err) }
		if (user) {
			console.log("exist");
			return res.redirect("/signUp");
		}
		console.log("save");
		let newUser = new User({
			username: username,
			password: password
		});
		newUser.save(next);
	});
}, passport.authenticate("logIn", {
	successRedirect: "/",
	failureRedirect: "/signUp",
}));

router.post("/logIn", passport.authenticate("logIn", {
	successRedirect: "/",
	failureRedirect: "/logIn",
	failureFlash: true
}));

router.get("/logOut", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.get("/message", ensureAuthenticated, (req, res) => {
	res.render("message");
});

export default router;