import express from 'express';

import User from '../../models/user';

const router = express.Router();

router.get("/getUser", (req, res) => {
	res.json({
		user: req.user
	});
});

router.post("/isUserExist", (req, res) => {
	const username = req.body.username;
	console.log(username);
	User.findOne({ username: username }, (err, user) => {
		if (err) { return next(err) }
		if (user) {
			return res.json({ 
				ok: false,
				error: 'user is already exist' 
			});
		} else {
			return res.json({ok : true})
		}
	});
});

export default router;