const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next) => {
  // request header에서 토큰 가져오기
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(401);

  try {
    // 유호한 토큰인지 확인
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({"_id": decode.userId});
    if (!user) {
      return res.status(400).send("해당하는 user가 없습니다.");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = auth;