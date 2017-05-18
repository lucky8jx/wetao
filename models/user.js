import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

const SALT_FACTOR = 10;

const noop = () => {};

userSchema.pre("save", function(done) {
	const user = this;
	if (!user.isModified("password")) {
		return done();
	}
	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if (err) { return done(err) }
		bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
			if (err) { return done(err); }
			user.password = hashedPassword;
			done();
		});
	});
});

userSchema.methods.checkPassword = function(guess, done) {
	bcrypt.compare(guess, this.password, (err, isMatch) => {
		done(err, isMatch);
	});
};

userSchema.methods.name = () => {
	return this.username;
};

const User = mongoose.model("User", userSchema);

export default User;