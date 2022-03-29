const express = require("express");
const { Post, Image, Comment, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { page } = req.query;
        let offset = 0;

        if (parseInt(page) > 1) {
            offset = 10 * (parseInt(page) - 1);
        }
        // 전체 게시글의 갯수
        const count = await Post.count();
        // 게시글을 페이지에 따라 10개씩 가져오기
        const posts = await Post.findAll({
            offset: offset,
            limit: 10,
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
    }
});

module.exports = router;
