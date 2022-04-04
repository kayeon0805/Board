const express = require("express");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const db = require("./models");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config();
passportConfig();

db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결");
    })
    .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/comment", commentRouter);

app.listen(8085, () => {
    console.log("서버 실행 중");
});
