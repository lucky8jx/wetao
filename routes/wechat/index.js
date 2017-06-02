import express from 'express';
import wechat from 'wechat';

const router = express.Router();

const config = {
  token: 'lucky8jx',
  appid: 'wx34ee83a1a70a07f0',
  encodingAESKey: 'ijbGf1KlAZ0O3HYkVE1lZ8IRVBeN5Zl4DJqii7IMeFc',
  checkSignature: true
};

router.get('/', wechat(config, (req, res, next) => {
  const message = req.weixin;
  if (message.Content === 'diaosi') {
    res.reply('hehe')
  }
}));

export default router;
