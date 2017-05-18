import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';

const router = express.Router();

router.use(corsPrefetch);

router.get("/", (req, res) => {
	res.render("message/index");
});
router.get("/new", (req, res) => {
	res.render("message/new");
});

router.post("/upload", imagesUpload(
	'public/img',
	'http://localhost:3000/img'
));

export default router;