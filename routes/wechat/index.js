import express from 'express';
import wechat from 'wechat';
import serverConfig from '../../config/server.json';

const router = express.Router();

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
}));

export default router;
