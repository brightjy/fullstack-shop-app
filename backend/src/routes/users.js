const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
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

router.post('/logout', auth, async (req, res, next) => {
  try {
      return res.sendStatus(200);
  } catch (error) {
      next(error)
  }
})

router.post('/cart', auth, async (req, res, next) => {
  try {
      // user Collection에 해당 유저의 정보를 가져옴
      const userInfo = await User.findOne({ _id: req.user._id })

      // 가져온 정보에서 카트에 넣으려는 상품이 이미 있는지 확인
      let duplicate = false;
      userInfo.cart.forEach((item) => {
        if (item.id === req.body.productId) {
          duplicate = true;
        }
      })

      // 상품이 이미 있으면
      if (duplicate) {
        const user = await User.findOneAndUpdate(
          { _id: req.user._id, "cart.id": req.body.productId },
          { $inc: {"cart.$.quantity": 1} },
          { new: true }
        )

        return res.status(201).send(user.cart);
      }

      // 없는 상품이면
      else {
        const user = await User.findOneAndUpdate(
          {_id: req.user._id},
          {
            $push: {
              cart: {
                id: req.body.productId,
                quantity: 1,
                date: Date.now()
              }
            }
          },
          { new: true }
        )

        return res.status(201).send(user.cart);
      }

  } catch (error) {
      next(error)
  }
})

router.delete('/cart', auth, async (req, res, next) => {
  try {
    // cart 상품 지우기
    const userInfo = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        "$pull":
          { "cart": { "id": req.query.productId }}
      },
      { new: true }
    )

    const cart = userInfo.cart;
    const array = cart.map(item => {
      return item.id
    })

    // 남아있는 상품 정보 다시 가져오기 + 배열화
    const productInfo = await Product
      .find({ _id: { $in: array }})
      .populate('writer');

      return res.status(200).json({
        productInfo,
        cart
      })

  } catch (error) {
    next(error);
  }
})

module.exports = router;