import express from 'express';
import wechat from 'wechat';
import WechatAPI from 'wechat-api';

import serverConfig from '../../config/server.json';

const router = express.Router();

const wechatApi = new WechatAPI(serverConfig.wechat.appid, serverConfig.wechat.appsecret);
const wechatMenu = serverConfig.wechat.menu;

const config = {
  token: serverConfig.wechat.token,
  appid: serverConfig.wechat.appid,
  encodingAESKey: serverConfig.wechat.encodingAESKey,
  checkSignature: true
};

router.use(express.query());

router.use('/', wechat(config, (req, res, next) => {
  const message = req.weixin;
  console.log(message);
  if (message.Content === 'diaosi') {
    res.reply('hehe')
  }

  wechatApi.createMenu(wechatMenu, (err, result) => {
		console.log(result);
	});
}));

export default router;
