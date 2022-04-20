const { Post, Image, Comment, User } = require("../../models");

const exPost = async (id) => {
    const post = await Post.findOne({
        where: { id: id },
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
        return res.status(401).send("존재하지 않는 게시물입니다.");
    }
    return post;
};

module.exports = exPost;
