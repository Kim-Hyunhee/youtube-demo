// express 모듈 셋팅
const express = require("express");
const app = express();
app.listen(7777);
app.use(express.json()); // http 외 모듈인 '미들웨어': json 설정

let db = new Map();
var id = 1; // 하나의 객체를 유니크하게 구별하기 위함

// 로그인
app.post("/login", function (req, res) {
  console.log(req.body); // userId, pwd

  // userId가 디비에 저장된 회원인지 확인
  const { userId, password } = req.body;
  db.forEach(function (user, id) {
    // forEach(function (a, b, c))
    // a: 데이터(value) b: 인덱스(key) c: 객체(Map)
    // console.log(user.userId);
    if (user.userId === userId) {
      console.log("같은 거 찾았다!");

      console.log(password, user.password);
      // pwd도 맞는지 비교
      if (user.password === password) {
        console.log("패스워드도 같다!");
      } else {
        console.log("패스워드는 틀렸다!");
      }
    }
  });
});

// 회원 가입
app.post("/join", function (req, res) {
  if (req.body == {}) {
    res.status(400).json({ message: `입력 값을 다시 확인해주세요.` });
  } else {
    db.set(id++, req.body);

    res.status(201).json({ message: `${db.get(id - 1).name}님 환영합니다.` });
  }
});

app
  .route("/users/:id")
  .get(function (req, res) {
    let { id } = req.params;
    id = parseInt(id);

    const user = db.get(id);
    if (user == undefined) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
    } else {
      res.status(200).json({ userId: user.userId, name: user.name });
    }
  })
  .delete(function (req, res) {
    let { id } = req.params;
    id = parseInt(id);

    const user = db.get(id);
    if (user == undefined) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
    } else {
      db.delete(id);

      res.status(200).json({ message: `${user.name}님 다음에 또 뵙겠습니다.` });
    }
  });
