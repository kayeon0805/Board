const express = require("express");
const { Post, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

// 댓글 추가
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.body.postId },
        });
        if (!post) {
            return res.status(404).send("존재하지 않는 게시물입니다.");
        }
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
        const post = await Post.findOne({
            where: { id: req.body.postId },
        });
        if (!post) {
            return res.status(404).send("존재하지 않는 게시물입니다.");
        }
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
        const post = await Post.findOne({
            where: { id: parseInt(postId) },
        });
        if (!post) {
            return res.status(404).send("존재하지 않는 게시물입니다.");
        }
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
