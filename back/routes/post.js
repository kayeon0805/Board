const express = require("express");
const { Post, Image, Comment, User } = require("../models");

const router = express.Router();

// 게시글 추가
router.post("/", async (req, res, next) => {
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
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
});

module.exports = router;
