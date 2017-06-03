import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';
import WechatAPI from 'wechat-api';

import serverConfig from './config/server.json';
import routes from './routes';
import message from './routes/message';
import apiV1 from './api/v1.0.0';
import setUpPassport from './common/setuppassport';
import wechat from './routes/wechat';

const wechatApi = new WechatAPI(serverConfig.wechat.appid, serverConfig.wechat.appsecret);
const wechatMenu = {
	"button": [
		{
			"name": "领券优惠",
			"sub_button": [
				{
					"type": "view",
					"name": "优惠首页",
					"url": "http://www.aiketao168.com"
				},
				{
					"type": "view",
					"name": "9.9元包邮",
					"url": "http://aiketao168.com/index.php?r=nine&u=516697"
				},
				{
					"type": "view",
					"name": "居家日用",
					"url": "http://aiketao168.com/index.php?r=l&cid=4&u=516697"
				},
				{
					"type": "view",
					"name": "超级人气榜",
					"url": "http://aiketao168.com/index.php?r=p&u=516697"
				},
				{
					"type": "view",
					"name": "母婴",
					"url": "http://aiketao168.com/index.php?r=l&cid=2&u=516697"
				}
			]
		},
		{
			"name": "更多优惠",
			"sub_button": [
				{
					"type": "view",
					"name": "鞋包、配饰",
					"url": "http://aiketao168.com/index.php?r=l&cid=5&u=516697"
				},
				{
					"type": "view",
					"name": "文体、车品",
					"url": "http://aiketao168.com/index.php?r=l&cid=7&u=516697"
				},
				{
					"type": "view",
					"name": "数码、家电",
					"url": "http://aiketao168.com/index.php?r=l&cid=8&u=516697"
				},
				{
					"type": "view",
					"name": "化妆品",
					"url": "http://aiketao168.com/index.php?r=l&cid=3&u=516697"
				},
				{
					"type": "view",
					"name": "服装",
					"url": "http://aiketao168.com/index.php?r=l&cid=1&u=516697"
				}
			]
		},
		{
			"name": "限时抢购",
			"sub_button": [
				{
					"type": "view",
					"name": "咚咚抢",
					"url": "http://www.aiketao168.com/index.php?r=ddq&u=516697"
				}
			]
		}
	]
};

const app = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect("mongodb://localhost:27017/wetao");
setUpPassport();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("short"));

// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVS$S,<<MX",
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use("/", urlencodedParser, routes);
app.use("/message", message);
app.use("/api/v1.0.0", jsonParser, apiV1);
app.use("/wechat", jsonParser, urlencodedParser, wechat);

app.listen(serverConfig.port, serverConfig.ip, () => {
	console.log("Server started on port " + serverConfig.port);
	const result = wechatApi.createMenu(wechatMenu);
	console.log(result);
});
