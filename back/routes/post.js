const express = require("express");
const { Post, Image, Comment, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const router = express.Router();

// 게시글 추가
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
            count: 0,
            UserId: req.user.id,
        });

        const fullPost = await Post.findOne({
            where: { id: post.id },
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
        res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 특정 게시물 불러오기, 조회수 증가
router.post("/:postId", async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
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
        if (!post) {
            return res.status(404).send("존재하지 않는 게시물입니다.");
        }
        const { count, id } = post.dataValues;
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
        const post = await Post.findOne({
            where: { id: req.body.postId },
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
        if (!post) {
            return res.status(404).send("존재하지 않는 게시물입니다.");
        }
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
