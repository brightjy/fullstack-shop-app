const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  // 유저 데이터 저장
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

module.exports = router;