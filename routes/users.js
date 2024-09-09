// express 모듈 셋팅
const express = require("express");
const router = express.Router();

router.use(express.json()); // http 외 모듈인 '미들웨어': json 설정

let db = new Map();
var id = 1; // 하나의 객체를 유니크하게 구별하기 위함

// 로그인
router.post("/login", function (req, res) {
  console.log(req.body); // userId, pwd

  // userId가 디비에 저장된 회원인지 확인
  const { userId, password } = req.body;

  let loginUser = hasUserId(db, userId);

  if (isExist(loginUser)) {
    console.log("같은 거 찾았다!");

    // pwd도 맞는지 비교
    if (loginUser.password === password) {
      console.log("패스워드도 같다!");
    } else {
      console.log("패스워드는 틀렸다!");
    }
  } else {
    console.log("입력하신 아이디는 없는 아이디 입니다.");
  }
});

function isExist(obj) {
  if (Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
}

function hasUserId(db, userId) {
  let foundUser = {};

  db.forEach((user) => {
    if (user.userId === userId) {
      foundUser = user;
    }
  });

  return foundUser || {};
}

// 회원 가입
router.post("/join", function (req, res) {
  if (req.body == {}) {
    res.status(400).json({ message: `입력 값을 다시 확인해주세요.` });
  } else {
    db.set(id++, req.body);

    res.status(201).json({ message: `${db.get(id - 1).name}님 환영합니다.` });
  }
});

router
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

module.exports = router;
