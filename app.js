const express = require("express");
const app = express();

app.listen(7777);

// 미들웨어
const userRouter = require("./routes/users"); // user-demo 소환
const channelRouter = require("./routes/channels"); // channel-demo 소환

app.use("/", userRouter);
app.use("/channels", channelRouter);
