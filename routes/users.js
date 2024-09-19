// express 모듈 셋팅
const express = require("express");
const router = express.Router();

const conn = require("../mariadb");

router.use(express.json()); // http 외 모듈인 '미들웨어': json 설정

let db = new Map();

// 로그인
router.post("/login", function (req, res) {
  // userId, pwd

  // userId가 디비에 저장된 회원인지 확인
  const { userId, password } = req.body;

  let loginUser = hasUserId(db, userId);

  if (isExist(loginUser)) {
    // pwd도 맞는지 비교
    if (loginUser.password === password) {
      res
        .status(200)
        .json({ message: `${loginUser.name}님 로그인 되었습니다.` });
    } else {
      res.status(400).json({ message: `비밀번호가 틀렸습니다.` });
    }
  } else {
    res.status(404).json({ message: `회원 정보가 없습니다.` });
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
    const { userId } = req.body;
    db.set(userId, req.body);

    res.status(201).json({ message: `${db.get(userId).name}님 환영합니다.` });
  }
});

router
  .route("/users")
  .get(function (req, res) {
    let { email } = req.body;

    conn.query(
      `SELECT * FROM users WHERE email = ?`,
      email,
      function (err, results, fields) {
        res.status(200).json(results);
      }
    );
  })
  .delete(function (req, res) {
    let { userId } = req.body;

    const user = db.get(userId);
    if (user) {
      db.delete(userId);

      res.status(200).json({ message: `${user.name}님 다음에 또 뵙겠습니다.` });
    } else {
      res.status(404).json({ message: "회원 정보가 없습니다." });
    }
  });

module.exports = router;
