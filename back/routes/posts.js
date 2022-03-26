const express = require("express");
const { Post, Image, Comment, User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const posts = await Post.findAll({
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
        res.status(200).json({ posts: posts });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
