import passport from 'passport';
import passportLocal from 'passport-local';

import User from '../models/user';

const LocalStrategy  = passportLocal.Strategy;

export default () => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use("logIn", new LocalStrategy((username, password, done) => {
		console.log(password);
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: "No user has that username!" });
			}
			// console.log(password);
			user.checkPassword(password, (err, isMatch) => {

				if (err) { return done(err); }
				if (isMatch) {
					console.log(isMatch);
					return done(null, user);
				} else {
					return done(null, false, { message: "Invalid password." });
				}
			});
		});
	}));
}