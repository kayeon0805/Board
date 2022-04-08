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
const path = require("path");

dotenv.config();
passportConfig();

db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결");
    })
    .catch(console.error);

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// express.static 함수를 통해 제공되는 파일에 대한 가상 경로
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SECRET));
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.SECRET,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/comment", commentRouter);

app.listen(8085, () => {
    console.log("서버 실행 중");
});
