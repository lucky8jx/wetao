import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import serverConfig from '../../config/server.json';

const router = express.Router();
const url = 'http://' + serverConfig.host + ':' + serverConfig.port + '/img';

router.use(corsPrefetch);

router.get("/", (req, res) => {
	res.render("message/index");
});
router.get("/new", (req, res) => {
	res.render("message/new");
});

router.post("/upload", imagesUpload(
	'public/img',
	url
));

export default router;
