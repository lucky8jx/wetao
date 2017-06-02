import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';

import serverConfig from './config/server.json';
import routes from './routes';
import message from './routes/message';
import apiV1 from './api/v1.0.0';
import setUpPassport from './common/setuppassport';
import wechat from './routes/wechat';

const app = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect("mongodb://" + serverConfig.host + ":27017/wetao");
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
app.use("/wechat", wechat);

app.listen(serverConfig.port, serverConfig.host, () => {
	console.log("Server started on port " + serverConfig.port);
});
