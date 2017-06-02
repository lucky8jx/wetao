import express from 'express';
import wechat from 'wechat';

const router = express.Router();

const config = {
  token: 'lucky8jx',
  appid: 'wx34ee83a1a70a07f0',
  // encodingAESKey: '123456abcdefg123456abcdefg123456abcdefg123456a',
  checkSignature: true
};

router.get('/', wechat(config, (req, res, next) => {
  const message = req.weixin;
  if (message.Content === 'diaosi') {
    res.reply('hehe')
  }
}));

export default router;
