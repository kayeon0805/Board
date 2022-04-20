const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const exPost = require("./deduplication/exPost");

const router = express.Router();

try {
    fs.accessSync("uploads");
} catch (error) {
    console.log("uploads 폴더가 없으므로 생성합니다.");
    fs.mkdirSync("uploads");
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads");
        },
        filename(req, file, done) {
            // a.png
            const ext = path.extname(file.originalname); // 확장자 추출(.png)
            const basename = path.basename(file.originalname, ext); // a
            done(null, basename + "_" + new Date().getTime() + ext); // a15184712891.png
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 게시글 추가
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
            count: 0,
            UserId: req.user.id,
        });
        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                // 이미지를 여러 개 올리면 image: [a.png, b.png]
                const images = await Promise.all(
                    req.body.image.map((image) => Image.create({ src: image }))
                );
                await post.addImages(images);
            } else {
                // 이미지를 하나만 올리면 image: a.png
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
        const fullPost = await exPost(post.id);
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 이미지 업로드
// .array(fieldname) => fieldname 인자에 명시된 이름의 파일 전부를 배열 형태로 전달 받음
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
    // req.files 는 `image` 라는 파일정보를 배열로 가지고 있음.
    res.json(req.files.map((v) => v.filename));
});

// 이미지 삭제
router.post("/images/delete", isLoggedIn, async (req, res, next) => {
    try {
        const post = await exPost(req.body.post);
        const image = await Image.findOne({
            where: { src: req.body.src },
        });
        post.removeImages(image);
        return res.status(200).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 특정 게시물 불러오기, 조회수 증가
router.post("/:postId", async (req, res, next) => {
    try {
        const post = await exPost(req.params.postId);
        const { count, id } = post;
        await Post.update(
            {
                count: parseInt(count) + 1,
            },
            {
                where: { id: id },
            }
        );
        res.status(200).json({ post: post });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 수정
router.patch("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await exPost(req.body.postId);
        await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                date: req.body.date + " (수정됨)",
            },
            {
                where: { id: req.body.postId },
            }
        );
        return res.status(200).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 삭제
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        await Post.destroy({
            where: { id: parseInt(req.params.id) },
        });
        return res.status(200).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 검색
router.get("/", async (req, res, next) => {
    try {
        const { page, search } = req.query;
        let offset = 0;

        if (parseInt(page) > 1) {
            offset = 10 * (parseInt(page) - 1);
        }
        const count = await Post.count({
            offset: offset,
            limit: 10,
            order: [["id", "DESC"]],
            where: {
                title: {
                    [Op.like]: "%" + search + "%",
                },
            },
        });
        const posts = await Post.findAll({
            where: {
                title: {
                    [Op.like]: "%" + search + "%",
                },
            },
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
