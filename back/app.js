const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();

db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결");
    })
    .catch(console.error);

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(8085, () => {
    console.log("서버 실행 중");
});