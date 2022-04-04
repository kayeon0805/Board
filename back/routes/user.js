const express = require("express");
const bcrypt = require("bcrypt");
const { User, Post, Image, Comment } = require("../models");
const passport = require("passport");
const router = express.Router();

// 회원가입
router.post("/", async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: { email: req.body.email },
        });
        if (exUser) {
            return res.status(400).send("이미 사용 중인 아이디입니다.");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname,
        });
        res.status(201).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 로그인
// 전략 실행, err, user, reason => passpoer/local.js에 콜백 함수에서 넘어옴.
router.post(
    "/login",
    // 미들웨어 확장
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            // 서버 에러
            if (err) {
                console.error(err);
                return next(err);
            }
            // 클라이언트 에러
            if (info) {
                return res.status(401).send(info.reason);
            }
            /*
                passport login, 서버에서 로그인할 때 다 통과하면 passport에서 한 번 더 함.
                req.logIn 할 때 알아서 내부적으로 ex) res.setHeader('Cookie', 'cxhly');
                이런 식으로 해주고 세션과도 연결해준다.
            */
            return req.logIn(user, async (loginErr) => {
                if (loginErr) {
                    console.error(loginErr);
                    return next(loginErr);
                }
                // 모두 성공
                return res.status(200).json(user);
            });
        })(req, res, next);
    }
);

// 사용자별 게시글 불러오기
router.get("/:userId", async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: { id: parseInt(req.params.userId) },
        });
        if (!exUser) {
            return res.status(400).send("존재하지 않는 사용자입니다.");
        }
        const { page } = req.query;
        let offset = 0;

        if (parseInt(page) > 1) {
            offset = 10 * (page - 1);
        }
        // 사용자가 작성한 전체 게시글의 갯수
        const count = await Post.count({
            where: { UserId: req.params.userId },
        });
        // 게시글을 페이지에 따라 10개씩 가져오기
        const posts = await Post.findAll({
            offset: offset,
            limit: 10,
            where: { UserId: req.params.userId },
            order: [["id", "DESC"]],
            include: [
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["email", "nickname"],
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ["email", "nickname"],
                },
            ],
        });
        res.status(200).json({ posts: posts, count: count });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
