const express = require('express');
const router = express.Router();
const { verifyToken } = require('./middlewares');

const {
  pwcompare,
  profile,
  nickupdate,
  pwupdate,
  authdelete,
} = require('../controllers/mypage');

router.post('/pw-compare', verifyToken, pwcompare);
router.get('/', verifyToken, profile);
router.put('/nick-update', verifyToken, nickupdate);
router.put('/pw-update', verifyToken, pwupdate);
router.delete('/auth-delete', verifyToken, authdelete);

module.exports = router;
