// Node.js의 진입점

const express = require('express');
const path = require('path'); // 절대 경로 사용 위해
const cors = require('cors');
const app = express();
const port = 4000;
const mongoose = require('mongoose'); // mongoDB 사용 위함
const dotenv = require('dotenv'); // 환경변수 사용 위함
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('mongodb 연결 완료')
  })
  .catch(err => {
    console.error(err);
  })

app.get('/', (req, res, next) => {
  setImmediate(() => { next(new Error('it ist an error')) });
  // setImmediate(() => {throw new Error('it is an error')}); <- 비동기요청은 이렇게 하면 에러처리 안됨
  // throw new Error('it is an error');
  // res.send('안녕하세요!');
})

app.post('/', (req, res) => {
  console.log(req.body);
  res.json(req.body);
})

// 에러처리
app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.send(error.message || '서버에서 에러가 났습니다.');
})

app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다.`);
});