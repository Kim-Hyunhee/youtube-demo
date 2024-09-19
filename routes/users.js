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
  const { email, password } = req.body;

  conn.query(
    `SELECT * FROM users WHERE email = ?`,
    email,
    function (err, results, fields) {
      const loginUser = results[0];
      if (loginUser && loginUser.password == password) {
        res
          .status(200)
          .json({ message: `${loginUser.name}님 로그인 되었습니다.` });
      } else {
        res.status(404).json({ message: `이메일 또는 비밀번호가 틀렸습니다.` });
      }
    }
  );
});

function isExist(obj) {
  if (Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
}

// 회원 가입
router.post("/join", function (req, res) {
  if (req.body == {}) {
    res.status(400).json({ message: `입력 값을 다시 확인해주세요.` });
  } else {
    const { email, name, password, contact } = req.body;

    conn.query(
      `INSERT INTO users (email, name, password, contact)
      VALUES (?, ?, ?, ?);`,
      [email, name, password, contact],
      function (err, results, fields) {
        res.status(201).json(results);
      }
    );
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
    let { email } = req.body;

    conn.query(
      `DELETE FROM users WHERE email = ?`,
      email,
      function (err, results, fields) {
        res.status(200).json(results);
      }
    );
  });

module.exports = router;
