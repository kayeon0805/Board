const express = require("express");
const { Post, Comment } = require("../models");
const exPost = require("./deduplication/exPost");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

// 댓글 추가
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await exPost(req.body.postId);
        await Comment.create({
            content: req.body.content,
            UserId: req.user.id,
            PostId: req.body.postId,
            date: req.body.date,
        });
        res.status(200).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 수정
router.patch("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await exPost(req.body.postId);
        await Comment.update(
            {
                content: req.body.content,
                date: req.body.date + " (수정됨)",
            },
            {
                where: { id: req.body.commentId, PostId: req.body.postId },
            }
        );
        res.status(200).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 삭제
router.delete("/", isLoggedIn, async (req, res, next) => {
    try {
        const { postId, commentId } = req.query;
        const post = await exPost(parseInt(postId));
        await Comment.destroy({
            where: { PostId: parseInt(postId), id: parseInt(commentId) },
        });
        res.status(200).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
