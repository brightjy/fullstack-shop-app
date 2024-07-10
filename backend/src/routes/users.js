const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
  return res.json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

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

router.post('/login', async (req, res, next) => {
  try {
    // 존재하는 유저인지 체크
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Auth failed, email not found.");
    }

    // 비밀번호가 맞는지 체크
    const isMatch = await user.comParePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Auth failed, wrong password.");
    }

    const payload = {
      userId: user._id.toHexString(),
    }
    // 토큰 생성
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'})

    return res.json({ user, accessToken });

  } catch (error) {
    console.log(error);
    next(error);
  }
})

module.exports = router;