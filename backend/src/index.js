// Node.js의 진입점

const express = require('express');
const path = require('path'); // 절대 경로 사용 위해
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.get('/', (req, res) => {
  res.send('안녕하세요!');
})

app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다.`);
});