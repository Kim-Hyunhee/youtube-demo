const express = require("express");
const app = express();

app.listen(7777);

// 미들웨어
const userRouter = require("./routes/user-demo"); // user-demo 소환
// channel-demo 소환?

app.use("/", userRouter);
