import express from 'express';

import User from '../../models/user';
import Posts from '../../models/posts';

const router = express.Router();

router.get("/getUser", (req, res) => {
	res.json({
		user: req.user
	});
});

router.post("/isUserExist", (req, res) => {
	res.set({"Access-Control-Allow-Origin": "*"});
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

router.post("/posts", (req, res) => {
	console.log(req.body);
	let newPosts = new Posts({
		posts: req.body
	});
	newPosts.save(function(err) {
		if (!err) {
			return res.json({ok: true});
		} else {
			return res.json({
				ok: false,
				error: err
			});
		}
	})
})

export default router;
